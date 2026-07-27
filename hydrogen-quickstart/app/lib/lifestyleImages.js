/**
 * @file lifestyleImages.js
 * @description High-quality lifestyle Unsplash helpers for Wild One–style imagery.
 */

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=2000&h=1200&fit=crop&q=80',
  dog: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=900&fit=crop&q=80',
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=900&fit=crop&q=80',
  living: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=900&fit=crop&q=80',
  product: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&h=800&fit=crop&q=80',
  bed: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop&q=80',
  toy: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800&h=800&fit=crop&q=80',
  grooming: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=800&fit=crop&q=80',
  journal: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=800&fit=crop&q=80',
  interior: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=900&fit=crop&q=80',
};

/**
 * @param {keyof typeof IMAGES | string} category
 * @returns {string}
 */
export function getImage(category) {
  const key = String(category || 'product').toLowerCase();
  if (IMAGES[key]) return IMAGES[key];
  if (key.includes('dog')) return IMAGES.dog;
  if (key.includes('cat')) return IMAGES.cat;
  if (key.includes('bed')) return IMAGES.bed;
  if (key.includes('toy')) return IMAGES.toy;
  if (key.includes('groom') || key.includes('food')) return IMAGES.product;
  return IMAGES.living;
}

export {IMAGES as LIFESTYLE_IMAGES};
