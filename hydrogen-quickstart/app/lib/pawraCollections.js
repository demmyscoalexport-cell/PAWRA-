/** PAWRA collection cards — handles map to mock.shop where available */
export const PAWRA_COLLECTIONS = [
  {
    handle: 'all',
    title: 'All Products',
    description: 'Every PAWRA smart pet product in one place.',
    path: '/collections/all',
    productCountLabel: 'Shop all',
  },
  {
    handle: 'hydrogen',
    title: 'GPS and Tracking',
    description: 'GPS collars and live location tracking for urban dogs.',
    path: '/collections/hydrogen',
    productCountLabel: null,
  },
  {
    handle: 'automated-collection',
    title: 'Feeding and Hydration',
    description: 'Smart fountains and automatic feeders for busy NYC schedules.',
    path: '/collections/automated-collection',
    productCountLabel: null,
  },
  {
    handle: 'frontpage',
    title: 'Safety and Visibility',
    description: 'LED collars, trackers, and visibility gear for city walks.',
    path: '/collections/frontpage',
    productCountLabel: null,
  },
  {
    handle: 'hydrogen',
    title: 'Dogs',
    description: 'Smart technology designed for dogs and their walkers.',
    path: '/collections/hydrogen',
    productCountLabel: null,
  },
  {
    handle: 'automated-collection',
    title: 'Cats',
    description: 'Hydration and feeding solutions for urban cats.',
    path: '/collections/automated-collection',
    productCountLabel: null,
  },
];

/** Fallback metadata when Shopify collection handle is missing */
export const PAWRA_COLLECTION_FALLBACK = {
  hydrogen: {
    title: 'GPS and Tracking',
    description: 'GPS collars and live location tracking for urban dogs.',
  },
  'automated-collection': {
    title: 'Feeding and Hydration',
    description: 'Smart fountains and automatic feeders.',
  },
  frontpage: {
    title: 'Safety and Visibility',
    description: 'LED collars, trackers, and visibility gear.',
  },
};
