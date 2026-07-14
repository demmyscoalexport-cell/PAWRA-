#!/usr/bin/env node
/**
 * Create PAWRA smart collections, tag products, and publish to Headless channel.
 * Requires a valid SHOPIFY_ADMIN_API_TOKEN with read/write products & collections.
 *
 *   npm run catalog:setup
 *   npm run catalog:setup -- --dry-run
 */

import {adminGraphql} from './shopifyAdmin.js';

const dryRun = process.argv.includes('--dry-run');
const HEADLESS_PUBLICATION_ID = process.env.PUBLIC_STOREFRONT_ID || '1000157996';

/** @type {Array<{ handle: string; title: string; description: string; rules: Array<{ column: string; relation: string; condition: string }> }>} */
const COLLECTIONS = [
  {
    handle: 'dogs',
    title: 'Dogs',
    description: 'Food, beds, toys, collars, and wellness for dogs.',
    rules: [
      {column: 'TAG', relation: 'CONTAINS', condition: 'dog'},
      {column: 'TYPE', relation: 'CONTAINS', condition: 'Dog'},
    ],
  },
  {
    handle: 'cats',
    title: 'Cats',
    description: 'Food, beds, toys, and grooming essentials for cats.',
    rules: [
      {column: 'TAG', relation: 'CONTAINS', condition: 'cat'},
      {column: 'TYPE', relation: 'CONTAINS', condition: 'Cat'},
    ],
  },
  {
    handle: 'food-treats',
    title: 'Food & Treats',
    description: 'Nutritious meals and treats for cats and dogs.',
    rules: [{column: 'TYPE', relation: 'EQUALS', condition: 'Food'}],
  },
  {
    handle: 'beds-comfort',
    title: 'Beds & Comfort',
    description: 'Beds, blankets, and comfort essentials.',
    rules: [{column: 'TYPE', relation: 'EQUALS', condition: 'Beds'}],
  },
  {
    handle: 'grooming-wellness',
    title: 'Grooming & Wellness',
    description: 'Grooming kits, supplements, and wellness products.',
    rules: [{column: 'TYPE', relation: 'EQUALS', condition: 'Grooming'}],
  },
];

/** Infer tags and product type from product title. */
function inferProductMeta(title) {
  const lower = title.toLowerCase();
  /** @type {string[]} */
  const tags = [];
  let productType = 'Pet supplies';

  if (/\bdog|\bpuppy|\bcanine\b/.test(lower)) tags.push('dog');
  if (/\bcat|\bkitten|\bfeline|\bkitty\b/.test(lower)) tags.push('cat');
  if (/\bfood|\btreat|\bkibble|\bmeal\b/.test(lower)) {
    tags.push('food');
    productType = 'Food';
  }
  if (/\bbed|\bmat|\bblanket|\bcushion\b/.test(lower)) {
    tags.push('beds');
    productType = 'Beds';
  }
  if (/\bgroom|\bbrush|\bshampoo|\bwellness|\bsupplement\b/.test(lower)) {
    tags.push('grooming');
    productType = 'Grooming';
  }
  if (/\btoy|\bcollar|\bleash\b/.test(lower)) tags.push('accessories');

  if (!tags.length) tags.push('pet');
  return {tags: [...new Set(tags)], productType};
}

async function findCollectionByHandle(handle) {
  const data = await adminGraphql(
    `query($handle: String!) {
      collectionByHandle(handle: $handle) { id handle title }
    }`,
    {handle},
  );
  return data.collectionByHandle;
}

async function createSmartCollection(spec) {
  const existing = await findCollectionByHandle(spec.handle);
  if (existing) {
    console.log(`  ✓ Collection "${spec.handle}" already exists`);
    return existing;
  }

  if (dryRun) {
    console.log(`  [dry-run] Would create collection "${spec.handle}"`);
    return null;
  }

  const data = await adminGraphql(
    `mutation($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id handle title }
        userErrors { field message }
      }
    }`,
    {
      input: {
        title: spec.title,
        handle: spec.handle,
        descriptionHtml: `<p>${spec.description}</p>`,
        ruleSet: {
          appliedDisjunctively: true,
          rules: spec.rules.map((r) => ({
            column: r.column,
            relation: r.relation,
            condition: r.condition,
          })),
        },
      },
    },
  );

  const errors = data.collectionCreate?.userErrors;
  if (errors?.length) {
    throw new Error(`collectionCreate ${spec.handle}: ${errors.map((e) => e.message).join(', ')}`);
  }

  console.log(`  ✓ Created collection "${spec.handle}"`);
  return data.collectionCreate.collection;
}

async function fetchAllProducts() {
  /** @type {Array<{ id: string; title: string; tags: string[]; productType: string }>} */
  const products = [];
  let cursor = null;

  do {
    const data = await adminGraphql(
      `query($cursor: String) {
        products(first: 50, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            id
            title
            tags
            productType
          }
        }
      }`,
      {cursor},
    );

    products.push(...data.products.nodes);
    cursor = data.products.pageInfo.hasNextPage ? data.products.pageInfo.endCursor : null;
  } while (cursor);

  return products;
}

async function updateProductMeta(product) {
  const {tags, productType} = inferProductMeta(product.title);
  const mergedTags = [...new Set([...(product.tags || []), ...tags])];

  if (dryRun) {
    console.log(`  [dry-run] ${product.title} → type=${productType}, tags=${mergedTags.join(', ')}`);
    return;
  }

  const data = await adminGraphql(
    `mutation($input: ProductInput!) {
      productUpdate(input: $input) {
        product { id title tags productType }
        userErrors { field message }
      }
    }`,
    {
      input: {
        id: product.id,
        tags: mergedTags,
        productType,
      },
    },
  );

  const errors = data.productUpdate?.userErrors;
  if (errors?.length) {
    console.warn(`  ⚠ ${product.title}: ${errors.map((e) => e.message).join(', ')}`);
    return;
  }

  console.log(`  ✓ Tagged "${product.title}" (${productType})`);
}

async function publishProductsToHeadless() {
  const data = await adminGraphql(
    `query {
      publications(first: 20) {
        nodes { id name }
      }
    }`,
  );

  const publication = data.publications.nodes.find(
    (p) => p.name?.toLowerCase().includes('headless') || p.id.includes(HEADLESS_PUBLICATION_ID),
  );

  if (!publication) {
    console.warn('  ⚠ Headless publication not found — publish products manually in Admin');
    return;
  }

  const products = await fetchAllProducts();

  for (const product of products) {
    if (dryRun) {
      console.log(`  [dry-run] Would publish ${product.title} to ${publication.name}`);
      continue;
    }

    await adminGraphql(
      `mutation($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          userErrors { field message }
        }
      }`,
      {
        id: product.id,
        input: [{publicationId: publication.id}],
      },
    );
  }

  console.log(`  ✓ Published ${products.length} products to "${publication.name}"`);
}

async function main() {
  console.log(dryRun ? 'PAWRA catalog setup (dry run)\n' : 'PAWRA catalog setup\n');

  console.log('1. Smart collections');
  for (const spec of COLLECTIONS) {
    await createSmartCollection(spec);
  }

  console.log('\n2. Product tags & types');
  const products = await fetchAllProducts();
  console.log(`  Found ${products.length} products`);
  for (const product of products) {
    await updateProductMeta(product);
  }

  console.log('\n3. Headless publication');
  await publishProductsToHeadless();

  console.log('\nDone. Run npm run probe:admin && npm run catalog:list to verify.');
}

main().catch((err) => {
  console.error('\n✗ Setup failed:', err.message);
  console.error('Regenerate SHOPIFY_ADMIN_API_TOKEN in Shopify Admin → Settings → Apps → Develop apps');
  process.exit(1);
});
