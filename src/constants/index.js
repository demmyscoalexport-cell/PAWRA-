export const COLLECTIONS = {
  DOGS: {
    handle: 'dogs',
    title: 'Dogs',
    description: 'Premium lifestyle products for dogs',
  },
  CATS: {
    handle: 'cats',
    title: 'Cats',
    description: 'Premium lifestyle products for cats',
  },
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rating' },
  { value: 'best-sellers', label: 'Best Sellers' },
];

export const PRICE_RANGES = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 250, label: '$100 - $250' },
  { min: 250, max: Infinity, label: 'Over $250' },
];

export const FEATURED_COLLECTIONS = [
  { handle: 'grooming', title: 'Grooming', icon: '🧴' },
  { handle: 'toys', title: 'Toys', icon: '🎾' },
  { handle: 'feeding', title: 'Feeding', icon: '🍽️' },
  { handle: 'treats', title: 'Treats', icon: '🍖' },
];

export const PAGES = {
  HOME: '/',
  COLLECTIONS: '/collections',
  COLLECTION: '/collections/:handle',
  PRODUCT: '/product/:handle',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  BLOG: '/blog',
};

export const CURRENCY = 'USD';
export const TAX_RATE = 0.08;
export const SHIPPING_THRESHOLD = 50;
export const FREE_SHIPPING_THRESHOLD = 100;
