/**
 * Shared collection page utilities — sorting and client-side filtering.
 */

import {PRICE_FILTERS} from '~/lib/pawraCollections';

/**
 * @param {Array<{title?: string; priceRange?: {minVariantPrice?: {amount?: string}}; productType?: string; tags?: string[]}>} products
 * @param {{sort?: string; price?: string; type?: string; tag?: string}} params
 */
export function applyCollectionFilters(products, params) {
  let result = [...products];

  if (params.price) {
    const range = PRICE_FILTERS.find((p) => p.id === params.price);
    if (range) {
      result = result.filter((p) => {
        const amount = Number(p.priceRange?.minVariantPrice?.amount ?? 0);
        return amount >= range.min && amount < range.max;
      });
    }
  }

  if (params.type) {
    result = result.filter((p) => p.productType === params.type);
  }

  if (params.tag) {
    const tag = params.tag.toLowerCase();
    result = result.filter((p) =>
      (p.tags ?? []).some((t) => t.toLowerCase() === tag),
    );
  }

  return result;
}

/**
 * @param {Array<{title?: string; priceRange?: {minVariantPrice?: {amount?: string}}}>} products
 * @param {string} [sort]
 */
export function sortCollectionProducts(products, sort = 'featured') {
  const nodes = [...products];

  switch (sort) {
    case 'price-asc':
      nodes.sort(
        (a, b) =>
          Number(a.priceRange?.minVariantPrice?.amount ?? 0) -
          Number(b.priceRange?.minVariantPrice?.amount ?? 0),
      );
      break;
    case 'price-desc':
      nodes.sort(
        (a, b) =>
          Number(b.priceRange?.minVariantPrice?.amount ?? 0) -
          Number(a.priceRange?.minVariantPrice?.amount ?? 0),
      );
      break;
    case 'title-asc':
      nodes.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
      break;
    case 'newest':
      nodes.reverse();
      break;
    default:
      break;
  }

  return nodes;
}

/**
 * Extract unique filter facets from a product list.
 * @param {Array<{productType?: string; tags?: string[]}>} products
 */
export function getCollectionFacets(products) {
  const types = [...new Set(products.map((p) => p.productType).filter(Boolean))].sort();
  const tags = [
    ...new Set(products.flatMap((p) => p.tags ?? []).filter(Boolean)),
  ].sort();

  return {types, tags};
}
