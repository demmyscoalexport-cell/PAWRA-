#!/usr/bin/env node
/**
 * Publish every Active product to the Hydrogen storefront channel
 * (also Headless / named storefront publications when present).
 *
 * Requires SHOPIFY_ADMIN_API_TOKEN with:
 *   read_products, read_publications, write_publications
 *
 *   npm run catalog:publish
 *   npm run catalog:publish -- --dry-run
 *   npm run catalog:publish -- --include-drafts
 */

import {adminGraphql} from './shopifyAdmin.js';

const dryRun = process.argv.includes('--dry-run');
const includeDrafts = process.argv.includes('--include-drafts');

/** Match Hydrogen / headless storefront publication names. */
function isStorefrontPublication(node) {
  const title = `${node.catalog?.title || ''} ${node.name || ''}`.toLowerCase();
  return (
    title.includes('hydrogen') ||
    title.includes('headless') ||
    title.includes('pawra') ||
    title.includes('storefront')
  );
}

/**
 * @returns {Promise<Array<{ id: string; label: string }>>}
 */
async function resolveTargetPublications() {
  const data = await adminGraphql(`
    query {
      publications(first: 50) {
        nodes {
          id
          name
          catalog { id title }
        }
      }
    }
  `);

  const nodes = data.publications?.nodes ?? [];
  const matched = nodes
    .filter(isStorefrontPublication)
    .map((n) => ({
      id: n.id,
      label: n.catalog?.title || n.name || n.id,
    }));

  if (matched.length) return matched;

  // Fallback: PUBLIC_STOREFRONT_ID from env (numeric or gid)
  const raw = process.env.PUBLIC_STOREFRONT_ID?.replace(/^"|"$/g, '').trim();
  if (raw) {
    const id = raw.startsWith('gid://')
      ? raw
      : `gid://shopify/Publication/${raw}`;
    const hit = nodes.find((n) => n.id === id || n.id.endsWith(`/${raw}`));
    if (hit) {
      return [{id: hit.id, label: hit.catalog?.title || hit.name || hit.id}];
    }
    return [{id, label: `Publication ${raw}`}];
  }

  console.error('Available publications:');
  for (const n of nodes) {
    console.error(`  • ${n.id} — ${n.catalog?.title || n.name || '(untitled)'}`);
  }
  throw new Error(
    'No Hydrogen/Headless publication found. Set PUBLIC_STOREFRONT_ID or install the Hydrogen sales channel.',
  );
}

/**
 * @returns {Promise<Array<{ id: string; title: string; status: string }>>}
 */
async function fetchAllProducts() {
  /** @type {Array<{ id: string; title: string; status: string }>} */
  const products = [];
  let cursor = null;

  do {
    const data = await adminGraphql(
      `query($cursor: String) {
        products(first: 50, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes { id title status }
        }
      }`,
      {cursor},
    );

    products.push(...(data.products?.nodes ?? []));
    cursor = data.products?.pageInfo?.hasNextPage
      ? data.products.pageInfo.endCursor
      : null;
  } while (cursor);

  return products;
}

/**
 * @param {string} productId
 * @param {Array<{ id: string }>} publications
 */
async function publishProduct(productId, publications) {
  const data = await adminGraphql(
    `mutation($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        userErrors { field message }
      }
    }`,
    {
      id: productId,
      input: publications.map((p) => ({publicationId: p.id})),
    },
  );

  const errors = data.publishablePublish?.userErrors ?? [];
  if (errors.length) {
    throw new Error(errors.map((e) => e.message).join('; '));
  }
}

async function main() {
  console.log(
    dryRun
      ? 'PAWRA publish all products (dry run)\n'
      : 'PAWRA publish all products → Hydrogen\n',
  );

  const publications = await resolveTargetPublications();
  console.log('Target publications:');
  for (const p of publications) {
    console.log(`  • ${p.label} (${p.id})`);
  }

  const all = await fetchAllProducts();
  const products = includeDrafts
    ? all
    : all.filter((p) => p.status === 'ACTIVE');

  console.log(
    `\nProducts: ${products.length} to publish` +
      (includeDrafts ? '' : ` (${all.length - products.length} non-ACTIVE skipped)`),
  );

  let ok = 0;
  let failed = 0;

  for (const product of products) {
    if (dryRun) {
      console.log(`  [dry-run] ${product.title} (${product.status})`);
      ok += 1;
      continue;
    }

    try {
      await publishProduct(product.id, publications);
      console.log(`  ✓ ${product.title}`);
      ok += 1;
    } catch (err) {
      console.warn(`  ✗ ${product.title}: ${err.message}`);
      failed += 1;
    }
  }

  console.log(`\nDone. Published ${ok}, failed ${failed}.`);
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error('\n✗ Publish failed:', err.message);
  console.error(
    'Set SHOPIFY_ADMIN_API_TOKEN in hydrogen-quickstart/.env (Admin API → Develop apps).',
  );
  process.exit(1);
});
