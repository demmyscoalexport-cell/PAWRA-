/**
 * Nested navigation — Shop by pet (Chewy-style) → category PLPs.
 * Species-scoped links use `?species=` so Dog Food and Cat Food stay distinct.
 */

/** @typedef {{ id: string; title: string; path: string }} NavLeaf */
/** @typedef {{ id: string; title: string; path?: string; children?: NavLeaf[] }} NavItem */

/** @type {NavItem[]} */
export const NAV_MAIN = [
  {
    id: 'dogs',
    title: 'Dog',
    path: '/collections/dogs',
    children: [
      {id: 'dogs-all', title: 'Shop all Dog', path: '/collections/dogs'},
      {id: 'dogs-food', title: 'Food', path: '/collections/food-treats?species=dog&category=food'},
      {id: 'dogs-treats', title: 'Treats', path: '/collections/food-treats?species=dog&category=treats'},
      {id: 'dogs-beds', title: 'Beds & Comfort', path: '/collections/beds-comfort?species=dog'},
      {id: 'dogs-grooming', title: 'Grooming & Wellness', path: '/collections/grooming-wellness?species=dog'},
      {id: 'dogs-featured', title: 'Best Sellers', path: '/collections/frontpage'},
    ],
  },
  {
    id: 'cats',
    title: 'Cat',
    path: '/collections/cats',
    children: [
      {id: 'cats-all', title: 'Shop all Cat', path: '/collections/cats'},
      {id: 'cats-food', title: 'Food', path: '/collections/food-treats?species=cat&category=food'},
      {id: 'cats-treats', title: 'Treats', path: '/collections/food-treats?species=cat&category=treats'},
      {id: 'cats-beds', title: 'Beds & Comfort', path: '/collections/beds-comfort?species=cat'},
      {id: 'cats-grooming', title: 'Grooming & Wellness', path: '/collections/grooming-wellness?species=cat'},
      {id: 'cats-featured', title: 'Best Sellers', path: '/collections/frontpage'},
    ],
  },
  {id: 'deals', title: 'Today\'s Deals', path: '/collections/frontpage'},
  {id: 'shop-all', title: 'Shop All', path: '/collections/all'},
];

/** Extra page links shown under Collections in the root panel */
export const NAV_PAGE_LINKS = [
  {id: 'about', title: 'About', path: '/pages/about'},
  {id: 'how-it-works', title: 'How It Works', path: '/pages/how-it-works'},
  {id: 'subscribe', title: 'Subscribe & Save', path: '/pages/subscribe-and-save'},
  {id: 'walker-program', title: 'Walker Program', path: '/pages/walker-program'},
  {id: 'blog', title: 'Blog', path: '/blog'},
  {id: 'contact', title: 'Contact', path: '/pages/contact'},
];

/** Desktop mega-menu columns (Dog / Cat only). */
export const MEGA_NAV_ITEMS = NAV_MAIN.filter((item) => item.children?.length);

/** @param {string} id */
export function getNavItemById(id) {
  return NAV_MAIN.find((item) => item.id === id) ?? null;
}
