/** @typedef {{ rating: number; count: number; reviews: Array<{ quote: string; name: string; meta: string; rating: number }> }} JudgeMeSummary */

const FALLBACK = {
  rating: 4.9,
  count: 0,
  reviews: [],
};

/**
 * Fetch product reviews from Judge.me public API (server-side only).
 * @param {{ shopDomain: string; apiToken: string }} config
 * @param {{ id?: string; handle?: string; title?: string }} product
 * @returns {Promise<JudgeMeSummary>}
 */
export async function fetchJudgeMeProductReviews(config, product) {
  if (!config.shopDomain || !config.apiToken || !product.handle) {
    return FALLBACK;
  }

  try {
    const params = new URLSearchParams({
      shop_domain: config.shopDomain,
      api_token: config.apiToken,
      handle: product.handle,
      per_page: '10',
    });

    const res = await fetch(`https://judge.me/api/v1/reviews?${params}`, {
      headers: {Accept: 'application/json'},
    });

    if (!res.ok) return FALLBACK;

    const json = await res.json();
    const reviews = (json.reviews ?? []).map((/** @type {{ rating: number; body: string; reviewer: { name: string }; created_at: string }} */ r) => ({
      rating: r.rating ?? 5,
      quote: r.body ?? '',
      name: r.reviewer?.name ?? 'Verified buyer',
      meta: r.created_at ? new Date(r.created_at).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : 'Verified purchase',
    }));

    const count = json.count ?? reviews.length;
    const rating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : FALLBACK.rating;

    return {rating, count, reviews};
  } catch {
    return FALLBACK;
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
    const params = new URLSearchParams({
      shop_domain: config.shopDomain,
      api_token: config.apiToken,
      per_page: '3',
      rating: '5',
    });

    const res = await fetch(`https://judge.me/api/v1/reviews?${params}`, {
      headers: {Accept: 'application/json'},
    });

    if (!res.ok) return [];

    const json = await res.json();
    return (json.reviews ?? []).slice(0, 3).map((/** @type {{ rating: number; body: string; reviewer: { name: string }; product_title?: string }} */ r) => ({
      rating: r.rating ?? 5,
      quote: r.body ?? '',
      name: r.reviewer?.name ?? 'Verified buyer',
      meta: r.product_title ? `${r.product_title} · Verified purchase` : 'Verified purchase',
    }));
  } catch {
    return [];
  }
}
