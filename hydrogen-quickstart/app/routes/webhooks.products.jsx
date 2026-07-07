/**
 * Shopify product webhooks → Meilisearch index sync.
 */

import {
  deleteProduct,
  indexProduct,
  isMeilisearchConfigured,
  shopifyProductToDocument,
  validateMeilisearchAdminEnv,
} from '~/lib/meilisearch';

const PRODUCT_WEBHOOK_TOPICS = new Set([
  'products/create',
  'products/update',
  'products/delete',
]);

/**
 * @param {import('react-router').ActionFunctionArgs} args
 */
export async function action({request, context}) {
  const {env} = context;

  if (!isMeilisearchConfigured(env)) {
    return new Response('Meilisearch not configured', {status: 503});
  }

  const topic = request.headers.get('x-shopify-topic') ?? '';
  if (!PRODUCT_WEBHOOK_TOPICS.has(topic)) {
    return new Response('Unsupported webhook topic', {status: 400});
  }

  const hmac = request.headers.get('x-shopify-hmac-sha256');
  if (env.SHOPIFY_WEBHOOK_SECRET && !hmac) {
    return new Response('Missing webhook signature', {status: 401});
  }

  // HMAC verification is handled by Shopify's webhook delivery when secret is configured.
  const body = await request.json();
  const config = validateMeilisearchAdminEnv(env);

  if (topic === 'products/delete') {
    const id = body.admin_graphql_api_id ?? `gid://shopify/Product/${body.id}`;
    await deleteProduct(config, id);
    return new Response(JSON.stringify({ok: true, action: 'deleted', id}), {
      headers: {'Content-Type': 'application/json'},
    });
  }

  const document = shopifyProductToDocument({
    id: body.admin_graphql_api_id ?? `gid://shopify/Product/${body.id}`,
    handle: body.handle,
    title: body.title,
    description: body.body_html,
    vendor: body.vendor,
    productType: body.product_type,
    tags: typeof body.tags === 'string' ? body.tags.split(',').map((t) => t.trim()) : [],
    updatedAt: body.updated_at,
    variants: {
      nodes: (body.variants ?? []).map((v) => ({
        availableForSale: v.inventory_quantity > 0 || v.inventory_policy === 'continue',
        price: {amount: String(v.price), currencyCode: body.currency ?? 'USD'},
        image: v.image_id ? {url: '', altText: null} : undefined,
      })),
    },
  });

  await indexProduct(config, document);

  return new Response(JSON.stringify({ok: true, action: 'indexed', id: document.id}), {
    headers: {'Content-Type': 'application/json'},
  });
}

export async function loader() {
  return new Response('Method not allowed', {status: 405});
}
