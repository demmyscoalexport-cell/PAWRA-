/**
 * @file productFlags.js
 * @description Helpers for Rx / compare metadata on mock + Shopify products.
 */

const RX_TAGS = new Set([
  'rx-required',
  'rx-dog-food',
  'rx-cat-food',
  'prescription-dog-food',
  'prescription-cat-food',
  'prescription-diets',
]);

/**
 * @param {{ tags?: string[]; productType?: string; prescriptionRequired?: boolean }} product
 */
export function isPrescriptionRequired(product) {
  if (!product) return false;
  if (product.prescriptionRequired === true) return true;
  const tags = (product.tags || []).map((t) => String(t).toLowerCase());
  if (tags.some((t) => RX_TAGS.has(t))) return true;
  if (String(product.productType || '').toLowerCase() === 'prescription') return true;
  return false;
}

/**
 * Soft compare attributes for table rows.
 * @param {any} product
 */
export function getCompareAttributes(product) {
  const tags = (product?.tags || []).map((t) => String(t).toLowerCase());
  return {
    handle: product.handle,
    title: product.title,
    image: product.featuredImage?.url || null,
    price: product.priceRange?.minVariantPrice || null,
    rating: tags.includes('sale') ? '4.7' : '4.5',
    keyIngredients: tags.includes('grain-free-dry-dog-food')
      ? 'Salmon, sweet potato'
      : tags.includes('pharmacy')
        ? 'Active pharmaceutical ingredients'
        : 'Named proteins, essential nutrients',
    lifeStage: tags.includes('puppy') || tags.includes('kitten')
      ? 'Puppy / Kitten'
      : tags.includes('senior')
        ? 'Senior'
        : 'Adult',
    breedSize: tags.includes('small-breed-dry-dog-food')
      ? 'Small'
      : tags.includes('large-breed-dry-dog-food')
        ? 'Large'
        : 'All sizes',
    prescriptionRequired: isPrescriptionRequired(product),
    productType: product.productType || 'Pet Supplies',
  };
}
