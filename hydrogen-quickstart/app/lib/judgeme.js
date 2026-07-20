/**
 * Judge.me server-side helpers for Hydrogen.
 * Private token stays on the server; public token is for the widget script only.
 *
 * API: https://api.judge.me/api/v1
 * Auth: X-Api-Token header (recommended)
 */

/** @typedef {{ rating: number; count: number; reviews: Array<{ quote: string; name: string; meta: string; rating: number }>; widgetHtml?: string; productId?: string }} JudgeMeSummary */

const API_BASE = 'https://api.judge.me/api/v1';

const FALLBACK = {
  rating: 0,
  count: 0,
  reviews: [],
  widgetHtml: '',
  productId: '',
};

/**
 * Extract numeric Shopify product ID from a Storefront GID.
 * @param {string | undefined} gid
 */
export function shopifyProductNumericId(gid) {
  if (!gid) return '';
  const match = String(gid).match(/Product\/(\d+)/);
  return match?.[1] ?? '';
}

/**
 * @param {{ shopDomain: string; apiToken: string }} config
 * @param {string} path
 * @param {Record<string, string>} query
 */
async function judgeMeGet(config, path, query) {
  const params = new URLSearchParams({
    shop_domain: config.shopDomain,
    ...query,
  });

  const res = await fetch(`${API_BASE}/${path}?${params}`, {
    headers: {
      Accept: 'application/json',
      'X-Api-Token': config.apiToken,
    },
  });

  if (!res.ok) {
    // Fallback: older Judge.me routes accept api_token as a query param
    const fallbackParams = new URLSearchParams({
      shop_domain: config.shopDomain,
      api_token: config.apiToken,
      ...query,
    });
    const retry = await fetch(`${API_BASE}/${path}?${fallbackParams}`, {
      headers: {Accept: 'application/json'},
    });
    if (!retry.ok) return null;
    return retry.json();
  }

  return res.json();
}

/**
 * @param {unknown} widgetJson
 */
function extractWidgetHtml(widgetJson) {
  if (!widgetJson || typeof widgetJson !== 'object') return '';
  const data = /** @type {Record<string, unknown>} */ (widgetJson);
  for (const key of ['HTML', 'html', 'widget']) {
    if (typeof data[key] === 'string') return data[key];
  }
  return '';
}

/**
 * Fetch product reviews + optional widget HTML (server-side only).
 * Shopify product IDs must be passed as `external_id` (not Judge.me `id`).
 * @param {{ shopDomain: string; apiToken: string }} config
 * @param {{ id?: string; handle?: string; title?: string }} product
 * @returns {Promise<JudgeMeSummary>}
 */
export async function fetchJudgeMeProductReviews(config, product) {
  if (!config.shopDomain || !config.apiToken) {
    return FALLBACK;
  }

  const productId = shopifyProductNumericId(product.id);
  if (!product.handle && !productId) {
    return FALLBACK;
  }

  try {
    // Reviews list: filter by handle when possible (product_id is Judge.me-internal)
    const reviewQuery = {
      per_page: '10',
      ...(product.handle ? {handle: product.handle} : {}),
    };

    // Widget: Shopify numeric ID = external_id
    const widgetQuery = {
      ...(productId ? {external_id: productId} : {}),
      ...(product.handle ? {handle: product.handle} : {}),
    };

    const [reviewsJson, widgetJson] = await Promise.all([
      judgeMeGet(config, 'reviews', reviewQuery),
      Object.keys(widgetQuery).length
        ? judgeMeGet(config, 'widgets/product_review', widgetQuery)
        : Promise.resolve(null),
    ]);

    if (!reviewsJson && !widgetJson) return {...FALLBACK, productId};

    const reviews = (reviewsJson?.reviews ?? []).map(
      (/** @type {{ rating: number; body: string; reviewer: { name: string }; created_at: string }} */ r) => ({
        rating: r.rating ?? 5,
        quote: r.body ?? '',
        name: r.reviewer?.name ?? 'Verified buyer',
        meta: r.created_at
          ? new Date(r.created_at).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})
          : 'Verified purchase',
      }),
    );

    const count = reviewsJson?.count ?? reviews.length;
    const rating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return {
      rating,
      count,
      reviews,
      widgetHtml: extractWidgetHtml(widgetJson),
      productId,
    };
  } catch {
    return {...FALLBACK, productId};
  }
}

/**
 * Fetch store-wide featured reviews for homepage testimonials.
 * @param {{ shopDomain: string; apiToken: string }} config
 * @returns {Promise<JudgeMeSummary['reviews']>}
 */
export async function fetchJudgeMeFeaturedReviews(config) {
  if (!config.shopDomain || !config.apiToken) return [];

  try {
    const json = await judgeMeGet(config, 'reviews', {
      per_page: '3',
      rating: '5',
    });
    if (!json) return [];

    return (json.reviews ?? []).slice(0, 3).map(
      (/** @type {{ rating: number; body: string; reviewer: { name: string }; product_title?: string }} */ r) => ({
        rating: r.rating ?? 5,
        quote: r.body ?? '',
        name: r.reviewer?.name ?? 'Verified buyer',
        meta: r.product_title ? `${r.product_title} · Verified purchase` : 'Verified purchase',
      }),
    );
  } catch {
    return [];
  }
}

/**
 * Fetch All Reviews page widget HTML (server-side).
 * @param {{ shopDomain: string; apiToken: string }} config
 * @returns {Promise<string>}
 */
export async function fetchJudgeMeAllReviewsWidget(config) {
  if (!config.shopDomain || !config.apiToken) return '';

  try {
    const json = await judgeMeGet(config, 'widgets/all_reviews_page', {
      review_type: 'product-reviews',
    });
    return extractWidgetHtml(json);
  } catch {
    return '';
  }
}
