/** PAWRA collection cards — mapped to Shopify collection handles when available */
export const PAWRA_COLLECTIONS = [
  {
    handle: 'all',
    title: 'All Products',
    description: 'Every premium pet product for cats and dogs.',
    path: '/collections/all',
    productCountLabel: 'Shop all',
  },
  {
    handle: 'hydrogen',
    title: 'Dog Products',
    description: 'Food, beds, toys, collars, and wellness for dogs.',
    path: '/collections/hydrogen',
    productCountLabel: null,
  },
  {
    handle: 'automated-collection',
    title: 'Cat Products',
    description: 'Food, beds, toys, and grooming essentials for cats.',
    path: '/collections/automated-collection',
    productCountLabel: null,
  },
  {
    handle: 'frontpage',
    title: 'Food & Treats',
    description: 'Premium nutrition and treats for cats and dogs.',
    path: '/collections/frontpage',
    productCountLabel: null,
  },
  {
    handle: 'hydrogen',
    title: 'Beds & Comfort',
    description: 'Cozy beds and comfort essentials for every pet.',
    path: '/collections/hydrogen',
    productCountLabel: null,
  },
  {
    handle: 'automated-collection',
    title: 'Grooming & Wellness',
    description: 'Grooming supplies and wellness products delivered to your door.',
    path: '/collections/automated-collection',
    productCountLabel: null,
  },
];

export const PAWRA_COLLECTION_FALLBACK = {
  hydrogen: {
    title: 'Dog Products',
    description: 'Premium products curated for dogs.',
  },
  'automated-collection': {
    title: 'Cat Products',
    description: 'Premium products curated for cats.',
  },
  frontpage: {
    title: 'Food & Treats',
    description: 'Nutrition and treats for cats and dogs.',
  },
};
