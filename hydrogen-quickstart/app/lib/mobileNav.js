/**
 * @file mobileNav.js
 * @description Navigation built from Chewy-depth taxonomy (mock catalog).
 */

import {COLLECTION_TAXONOMY, getMegaMenuColumns, taxonomyCollectionPath} from '~/data/collections';

/** @typedef {{ id: string; title: string; path: string; children?: NavItem[] }} NavItem */

function mapChildren(rootHandle, nodes, pathPrefix) {
  return (nodes || []).map((node) => ({
    id: node.handle,
    title: node.title,
    path: taxonomyCollectionPath([...pathPrefix, node.handle]),
    children: (node.children || []).map((child) => ({
      id: child.handle,
      title: child.title,
      path: taxonomyCollectionPath([...pathPrefix, node.handle, child.handle]),
    })),
  }));
}

/** @type {NavItem[]} */
export const NAV_MAIN = [
  {
    id: 'dogs',
    title: 'Dog',
    path: taxonomyCollectionPath(['dogs']),
    children: mapChildren('dogs', COLLECTION_TAXONOMY.dogs.children, ['dogs']),
  },
  {
    id: 'cats',
    title: 'Cat',
    path: taxonomyCollectionPath(['cats']),
    children: mapChildren('cats', COLLECTION_TAXONOMY.cats.children, ['cats']),
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    path: taxonomyCollectionPath(['pharmacy']),
    children: mapChildren('pharmacy', COLLECTION_TAXONOMY.pharmacy.children, ['pharmacy']),
  },
  {
    id: 'deals',
    title: "Today's Deals",
    path: taxonomyCollectionPath(['todays-deals']),
  },
  {
    id: 'shop-all',
    title: 'Shop All',
    path: '/collections',
  },
];

export const NAV_PAGE_LINKS = [
  {id: 'small-pets', title: 'Small Pets', path: taxonomyCollectionPath(['small-pets'])},
  {id: 'pharmacy-care', title: 'Pharmacy', path: '/pharmacy'},
  {id: 'telehealth', title: 'Telehealth', path: '/telehealth'},
  {id: 'symptom-checker', title: 'Symptom Checker', path: '/health/symptom-checker'},
  {id: 'about', title: 'About', path: '/pages/about'},
  {id: 'how-it-works', title: 'How It Works', path: '/pages/how-it-works'},
  {id: 'subscribe', title: 'Subscribe & Save', path: '/pages/subscribe-and-save'},
  {id: 'walker-program', title: 'Walker Program', path: '/pages/walker-program'},
  {id: 'breeds', title: 'Breed Guides', path: '/breeds'},
  {id: 'blog', title: 'Blog', path: '/blog'},
  {id: 'contact', title: 'Contact', path: '/pages/contact'},
];

/** Care destinations surfaced near shop nav */
export const CARE_NAV_LINKS = [
  {id: 'care-pharmacy', title: 'Pharmacy', path: '/pharmacy'},
  {id: 'care-telehealth', title: 'Telehealth', path: '/telehealth'},
  {id: 'care-health', title: 'Health Hub', path: '/health/symptom-checker'},
];

export const MEGA_NAV_ITEMS = NAV_MAIN.filter((item) => item.children?.length);

/** @param {string} id */
export function getNavItemById(id) {
  return NAV_MAIN.find((item) => item.id === id) ?? null;
}

/** Mega-menu column data for dogs/cats/pharmacy */
export function getNavMegaColumns(id) {
  return getMegaMenuColumns(id);
}
