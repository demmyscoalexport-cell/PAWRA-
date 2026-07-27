/**
 * @file resolveProductImage.js
 * @description Resolve a product media URL — Shopify CDN first, then PAWRA studio assets.
 */

import {getProductImage} from '~/data/productImages';

/**
 * @param {{
 *   handle?: string;
 *   title?: string;
 *   featuredImage?: {url?: string; altText?: string; width?: number; height?: number; id?: string} | null;
 *   selectedOrFirstAvailableVariant?: {image?: {url?: string; altText?: string; width?: number; height?: number} | null} | null;
 *   images?: {nodes?: Array<{url?: string; altText?: string; width?: number; height?: number}>};
 * } | null | undefined} product
 */
export function resolveProductImage(product) {
  if (!product) return null;

  const fromShopify =
    product.featuredImage?.url ||
    product.selectedOrFirstAvailableVariant?.image?.url ||
    product.images?.nodes?.[0]?.url ||
    null;

  if (fromShopify) {
    return {
      id: product.featuredImage?.id || `img-${product.handle || 'product'}`,
      url: fromShopify,
      altText:
        product.featuredImage?.altText ||
        product.selectedOrFirstAvailableVariant?.image?.altText ||
        product.images?.nodes?.[0]?.altText ||
        product.title ||
        'Product',
      width:
        product.featuredImage?.width ||
        product.selectedOrFirstAvailableVariant?.image?.width ||
        product.images?.nodes?.[0]?.width ||
        800,
      height:
        product.featuredImage?.height ||
        product.selectedOrFirstAvailableVariant?.image?.height ||
        product.images?.nodes?.[0]?.height ||
        800,
    };
  }

  const studio = product.handle ? getProductImage(product.handle) : null;
  if (!studio) return null;

  return {
    id: `studio-${product.handle}`,
    url: studio,
    altText: product.title || 'Product',
    width: 800,
    height: 800,
  };
}

/** @param {string | null | undefined} url */
export function isShopifyCdnImage(url) {
  return Boolean(url && url.includes('cdn.shopify.com'));
}
