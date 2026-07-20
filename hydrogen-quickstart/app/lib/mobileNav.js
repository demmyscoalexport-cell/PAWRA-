/**
 * Nested hamburger navigation — Collections → Sub-collections → Shopify PLP routes.
 * Maps to handles in pawraCollections.js / Storefront collection pages.
 */

/** @typedef {{ id: string; title: string; path: string }} NavLeaf */
/** @typedef {{ id: string; title: string; path?: string; children?: NavLeaf[] }} NavItem */

/** @type {NavItem[]} */
export const NAV_MAIN = [
  {
    id: 'dogs',
    title: 'Dog',
    children: [
      {id: 'dogs-all', title: 'Shop all Dog', path: '/collections/dogs'},
      {id: 'dogs-food', title: 'Food & Treats', path: '/collections/food-treats'},
      {id: 'dogs-beds', title: 'Beds & Comfort', path: '/collections/beds-comfort'},
      {id: 'dogs-grooming', title: 'Grooming & Wellness', path: '/collections/grooming-wellness'},
    ],
  },
  {
    id: 'cats',
    title: 'Cat',
    children: [
      {id: 'cats-all', title: 'Shop all Cat', path: '/collections/cats'},
      {id: 'cats-food', title: 'Food & Treats', path: '/collections/food-treats'},
      {id: 'cats-beds', title: 'Beds & Comfort', path: '/collections/beds-comfort'},
      {id: 'cats-grooming', title: 'Grooming & Wellness', path: '/collections/grooming-wellness'},
    ],
  },
  {id: 'shop-all', title: 'Shop All', path: '/collections/all'},
  {id: 'featured', title: 'Featured', path: '/collections/frontpage'},
];

/** Extra page links shown under Collections in the root panel */
export const NAV_PAGE_LINKS = [
  {id: 'about', title: 'About', path: '/pages/about'},
  {id: 'how-it-works', title: 'How It Works', path: '/pages/how-it-works'},
  {id: 'walker-program', title: 'Walker Program', path: '/pages/walker-program'},
  {id: 'blog', title: 'Blog', path: '/blog'},
  {id: 'contact', title: 'Contact', path: '/pages/contact'},
];

/** @param {string} id */
export function getNavItemById(id) {
  return NAV_MAIN.find((item) => item.id === id) ?? null;
}
