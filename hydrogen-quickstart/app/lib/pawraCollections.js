/**
 * PAWRA collection taxonomy — Chewy-inspired, pet-first IA.
 * Single source of truth for nav, footer, filters, and Shopify Admin setup.
 */

/** @typedef {'dogs' | 'cats'} PawraSpecies */

/**
 * @typedef {Object} PawraCategory
 * @property {string} handle
 * @property {string} title
 * @property {string} description
 * @property {string} path
 * @property {PawraSpecies} [species]
 * @property {string} [productType]
 * @property {string[]} [tags]
 */

/**
 * @typedef {Object} PawraCollectionFallback
 * @property {string} title
 * @property {string} description
 * @property {PawraSpecies} [species]
 * @property {string} [productType]
 * @property {string[]} [tagsAny]
 * @property {string[]} [tagsAll]
 */

// ─── Dog categories ───────────────────────────────────────────────────────────

export const DOG_CATEGORIES = /** @type {PawraCategory[]} */ ([
  {
    handle: 'dogs-grooming',
    title: 'Dog Grooming',
    description: 'Shampoos, brushes, nail care, and professional grooming essentials.',
    path: '/collections/dogs-grooming',
    species: 'dogs',
    productType: 'Grooming',
    tags: ['grooming', 'dogs'],
  },
  {
    handle: 'dogs-toys',
    title: 'Dog Toys',
    description: 'Interactive puzzles, chew toys, and enrichment for every play style.',
    path: '/collections/dogs-toys',
    species: 'dogs',
    productType: 'Toys',
    tags: ['toys', 'dogs'],
  },
  {
    handle: 'dogs-treats',
    title: 'Dog Treats',
    description: 'Premium treats for dental health, digestion, and everyday rewards.',
    path: '/collections/dogs-treats',
    species: 'dogs',
    productType: 'Treats',
    tags: ['treats', 'dogs'],
  },
  {
    handle: 'dogs-feeding',
    title: 'Dog Feeding',
    description: 'Bowls, elevated stands, and slow feeders for healthy mealtimes.',
    path: '/collections/dogs-feeding',
    species: 'dogs',
    productType: 'Feeding',
    tags: ['feeding', 'dogs'],
  },
  {
    handle: 'dogs-walk-travel',
    title: 'Dog Walk & Travel',
    description: 'Harnesses, leashes, and gear for safe adventures.',
    path: '/collections/dogs-walk-travel',
    species: 'dogs',
    productType: 'Harnesses & Leashes',
    tags: ['harness', 'leash', 'dogs'],
  },
  {
    handle: 'dogs-paw-wellness',
    title: 'Dog Paw & Wellness',
    description: 'Paw balms, booties, and protective care for active paws.',
    path: '/collections/dogs-paw-wellness',
    species: 'dogs',
    productType: 'Paw Protection',
    tags: ['paw', 'protection', 'dogs'],
  },
  {
    handle: 'dogs-dental',
    title: 'Dog Dental Care',
    description: 'Toothbrushes, dental treats, and oral health essentials.',
    path: '/collections/dogs-dental',
    species: 'dogs',
    productType: 'Dental Care',
    tags: ['dental', 'dogs'],
  },
]);

// ─── Cat categories ───────────────────────────────────────────────────────────

export const CAT_CATEGORIES = /** @type {PawraCategory[]} */ ([
  {
    handle: 'cats-grooming',
    title: 'Cat Grooming',
    description: 'Gentle shampoos, brushes, and nail care for feline coats.',
    path: '/collections/cats-grooming',
    species: 'cats',
    productType: 'Grooming',
    tags: ['grooming', 'cats'],
  },
  {
    handle: 'cats-toys',
    title: 'Cat Toys & Enrichment',
    description: 'Wands, lasers, and interactive toys for curious cats.',
    path: '/collections/cats-toys',
    species: 'cats',
    productType: 'Interactive Toys',
    tags: ['toys', 'interactive', 'cats'],
  },
  {
    handle: 'cats-treats',
    title: 'Cat Treats',
    description: 'Freeze-dried, dental, and fish-flavored rewards cats love.',
    path: '/collections/cats-treats',
    species: 'cats',
    productType: 'Treats',
    tags: ['treats', 'cats'],
  },
  {
    handle: 'cats-feeding',
    title: 'Cat Feeding',
    description: 'Bowls, fountains, and feeding accessories for hydration and nutrition.',
    path: '/collections/cats-feeding',
    species: 'cats',
    productType: 'Feeding',
    tags: ['feeding', 'cats'],
  },
  {
    handle: 'cats-walk-travel',
    title: 'Cat Walk & Travel',
    description: 'Harness vests and leashes for adventure-ready cats.',
    path: '/collections/cats-walk-travel',
    species: 'cats',
    productType: 'Harnesses & Leashes',
    tags: ['harness', 'leash', 'cats'],
  },
  {
    handle: 'cats-paw-wellness',
    title: 'Cat Paw & Wellness',
    description: 'Paw balms, scratching posts, and wellness essentials.',
    path: '/collections/cats-paw-wellness',
    species: 'cats',
    productType: 'Paw Protection',
    tags: ['paw', 'scratching', 'cats'],
  },
  {
    handle: 'cats-dental',
    title: 'Cat Dental Care',
    description: 'Toothbrushes and dental treats for feline oral health.',
    path: '/collections/cats-dental',
    species: 'cats',
    productType: 'Dental Care',
    tags: ['dental', 'cats'],
  },
  {
    handle: 'cats-litter',
    title: 'Cat Litter & Waste',
    description: 'Premium litter and designer litter boxes.',
    path: '/collections/cats-litter',
    species: 'cats',
    productType: 'Litter & Waste',
    tags: ['litter', 'cats'],
  },
]);

// ─── Curated collections ──────────────────────────────────────────────────────

export const CURATED_COLLECTIONS = /** @type {PawraCategory[]} */ ([
  {
    handle: 'all',
    title: 'All Products',
    description: 'Every premium PAWRA product for cats and dogs.',
    path: '/collections/all',
  },
  {
    handle: 'dogs',
    title: 'All Dog Products',
    description: 'Food, toys, grooming, feeding, and wellness for dogs.',
    path: '/collections/dogs',
    species: 'dogs',
    tags: ['dogs'],
  },
  {
    handle: 'cats',
    title: 'All Cat Products',
    description: 'Food, toys, grooming, litter, and wellness for cats.',
    path: '/collections/cats',
    species: 'cats',
    tags: ['cats'],
  },
  {
    handle: 'food-and-treats',
    title: 'Food & Treats',
    description: 'Premium nutrition and treats for every pet.',
    path: '/collections/food-and-treats',
    tagsAny: ['treats', 'feeding'],
  },
  {
    handle: 'grooming-wellness',
    title: 'Grooming & Wellness',
    description: 'Grooming, dental, and paw care across species.',
    path: '/collections/grooming-wellness',
    tagsAny: ['grooming', 'dental', 'paw'],
  },
  {
    handle: 'best-sellers',
    title: 'PAWRA Best Sellers',
    description: 'Top-rated favorites loved by pet parents nationwide.',
    path: '/collections/best-sellers',
    tagsAny: ['bestseller'],
  },
  {
    handle: 'new-pet-essentials',
    title: 'New Pet Essentials',
    description: 'Starter essentials for your new cat or dog.',
    path: '/collections/new-pet-essentials',
    tagsAny: ['new-pet', 'essentials'],
  },
]);

/** Species hubs for mega menu */
export const PAWRA_SPECIES = [
  {
    id: 'dogs',
    title: 'Dogs',
    path: '/collections/dogs',
    description: 'Premium products curated for dogs.',
    categories: DOG_CATEGORIES,
    featuredPath: '/collections/dogs-grooming',
    featuredLabel: 'Shop Dog Grooming',
  },
  {
    id: 'cats',
    title: 'Cats',
    path: '/collections/cats',
    description: 'Premium products curated for cats.',
    categories: CAT_CATEGORIES,
    featuredPath: '/collections/cats-toys',
    featuredLabel: 'Shop Cat Toys',
  },
];

/** Flat list for collection index cards */
export const PAWRA_COLLECTIONS = [
  ...CURATED_COLLECTIONS.filter((c) => c.handle !== 'all'),
  ...DOG_CATEGORIES,
  ...CAT_CATEGORIES,
];

/** Primary header navigation */
export const PAWRA_HEADER_MENU = [
  {id: 'dogs', title: 'Dogs', url: '/collections/dogs', hasMegaMenu: true, speciesId: 'dogs'},
  {id: 'cats', title: 'Cats', url: '/collections/cats', hasMegaMenu: true, speciesId: 'cats'},
  {id: 'new-pet', title: 'New Pet Essentials', url: '/collections/new-pet-essentials'},
  {id: 'subscribe', title: 'Subscribe & Save', url: '/pages/subscribe-and-save'},
  {id: 'blog', title: 'Blog', url: '/blog'},
];

/** Mobile-only extra links */
export const PAWRA_MOBILE_EXTRA = [
  {id: 'shop-all', title: 'Shop All', url: '/collections/all'},
  {id: 'best-sellers', title: 'Best Sellers', url: '/collections/best-sellers'},
  {id: 'how-it-works', title: 'How It Works', url: '/pages/how-it-works'},
  {id: 'contact', title: 'Contact', url: '/pages/contact'},
];

/** Footer shop column */
export const PAWRA_FOOTER_SHOP_LINKS = [
  {label: 'All Products', to: '/collections/all'},
  {label: 'Dogs', to: '/collections/dogs'},
  {label: 'Cats', to: '/collections/cats'},
  {label: 'Food & Treats', to: '/collections/food-and-treats'},
  {label: 'Grooming & Wellness', to: '/collections/grooming-wellness'},
  {label: 'New Pet Essentials', to: '/collections/new-pet-essentials'},
  {label: 'Best Sellers', to: '/collections/best-sellers'},
  {label: 'Subscribe & Save', to: '/pages/subscribe-and-save'},
];

/** Fallback when Shopify collection handle is not yet created in Admin */
export const PAWRA_COLLECTION_FALLBACK = /** @type {Record<string, PawraCollectionFallback>} */ ({
  dogs: {
    title: 'All Dog Products',
    description: 'Premium food, toys, grooming, feeding, and wellness for dogs.',
    species: 'dogs',
    tagsAny: ['dogs'],
  },
  cats: {
    title: 'All Cat Products',
    description: 'Premium food, toys, grooming, litter, and wellness for cats.',
    species: 'cats',
    tagsAny: ['cats'],
  },
  'dogs-grooming': {title: 'Dog Grooming', description: DOG_CATEGORIES[0].description, species: 'dogs', productType: 'Grooming', tagsAny: ['grooming', 'dogs']},
  'dogs-toys': {title: 'Dog Toys', description: DOG_CATEGORIES[1].description, species: 'dogs', productType: 'Toys', tagsAny: ['toys', 'dogs']},
  'dogs-treats': {title: 'Dog Treats', description: DOG_CATEGORIES[2].description, species: 'dogs', productType: 'Treats', tagsAny: ['treats', 'dogs']},
  'dogs-feeding': {title: 'Dog Feeding', description: DOG_CATEGORIES[3].description, species: 'dogs', productType: 'Feeding', tagsAny: ['feeding', 'dogs']},
  'dogs-walk-travel': {title: 'Dog Walk & Travel', description: DOG_CATEGORIES[4].description, species: 'dogs', productType: 'Harnesses & Leashes', tagsAny: ['harness', 'leash', 'dogs']},
  'dogs-paw-wellness': {title: 'Dog Paw & Wellness', description: DOG_CATEGORIES[5].description, species: 'dogs', productType: 'Paw Protection', tagsAny: ['paw', 'dogs']},
  'dogs-dental': {title: 'Dog Dental Care', description: DOG_CATEGORIES[6].description, species: 'dogs', productType: 'Dental Care', tagsAny: ['dental', 'dogs']},
  'cats-grooming': {title: 'Cat Grooming', description: CAT_CATEGORIES[0].description, species: 'cats', productType: 'Grooming', tagsAny: ['grooming', 'cats']},
  'cats-toys': {title: 'Cat Toys & Enrichment', description: CAT_CATEGORIES[1].description, species: 'cats', productType: 'Interactive Toys', tagsAny: ['toys', 'cats']},
  'cats-treats': {title: 'Cat Treats', description: CAT_CATEGORIES[2].description, species: 'cats', productType: 'Treats', tagsAny: ['treats', 'cats']},
  'cats-feeding': {title: 'Cat Feeding', description: CAT_CATEGORIES[3].description, species: 'cats', productType: 'Feeding', tagsAny: ['feeding', 'cats']},
  'cats-walk-travel': {title: 'Cat Walk & Travel', description: CAT_CATEGORIES[4].description, species: 'cats', productType: 'Harnesses & Leashes', tagsAny: ['harness', 'leash', 'cats']},
  'cats-paw-wellness': {title: 'Cat Paw & Wellness', description: CAT_CATEGORIES[5].description, species: 'cats', productType: 'Paw Protection', tagsAny: ['paw', 'scratching', 'cats']},
  'cats-dental': {title: 'Cat Dental Care', description: CAT_CATEGORIES[6].description, species: 'cats', productType: 'Dental Care', tagsAny: ['dental', 'cats']},
  'cats-litter': {title: 'Cat Litter & Waste', description: CAT_CATEGORIES[7].description, species: 'cats', productType: 'Litter & Waste', tagsAny: ['litter', 'cats']},
  'food-and-treats': {title: 'Food & Treats', description: 'Premium nutrition and treats for cats and dogs.', tagsAny: ['treats', 'feeding']},
  'grooming-wellness': {title: 'Grooming & Wellness', description: 'Grooming, dental, and paw care for every pet.', tagsAny: ['grooming', 'dental', 'paw']},
  'best-sellers': {title: 'PAWRA Best Sellers', description: 'Top-rated favorites from the PAWRA catalog.'},
  'new-pet-essentials': {title: 'New Pet Essentials', description: 'Everything you need for a new cat or dog.'},
});

export const SORT_OPTIONS = [
  {value: 'featured', label: 'Featured'},
  {value: 'price-asc', label: 'Price: low to high'},
  {value: 'price-desc', label: 'Price: high to low'},
  {value: 'newest', label: 'Newest'},
  {value: 'title-asc', label: 'Name: A–Z'},
];

export const PRICE_FILTERS = [
  {id: 'under-25', label: 'Under $25', min: 0, max: 25},
  {id: '25-50', label: '$25 – $50', min: 25, max: 50},
  {id: '50-100', label: '$50 – $100', min: 50, max: 100},
  {id: 'over-100', label: 'Over $100', min: 100, max: Infinity},
];

/**
 * Resolve collection config by URL handle.
 * @param {string} handle
 */
export function getCollectionByHandle(handle) {
  const all = [...CURATED_COLLECTIONS, ...DOG_CATEGORIES, ...CAT_CATEGORIES];
  return all.find((c) => c.handle === handle) ?? null;
}

/**
 * Build breadcrumb trail for a collection handle.
 * @param {string} handle
 */
export function getCollectionBreadcrumbs(handle) {
  const crumbs = [{label: 'Home', path: '/'}, {label: 'Shop', path: '/collections'}];
  if (handle === 'all') {
    crumbs.push({label: 'All Products', path: '/collections/all'});
    return crumbs;
  }
  const config = getCollectionByHandle(handle) ?? PAWRA_COLLECTION_FALLBACK[handle];
  if (!config) return crumbs;

  if (handle.startsWith('dogs')) {
    crumbs.push({label: 'Dogs', path: '/collections/dogs'});
  } else if (handle.startsWith('cats')) {
    crumbs.push({label: 'Cats', path: '/collections/cats'});
  }

  if (handle !== 'dogs' && handle !== 'cats') {
    crumbs.push({label: config.title, path: `/collections/${handle}`});
  } else {
    crumbs[crumbs.length - 1] = {label: config.title, path: `/collections/${handle}`};
  }

  return crumbs;
}

/**
 * Build breadcrumb trail for a product detail page.
 * @param {{title?: string; productType?: string; tags?: string[]}} product
 */
export function getProductBreadcrumbs(product) {
  const tags = (product.tags ?? []).map((t) => t.toLowerCase());
  const crumbs = [
    {label: 'Home', path: '/'},
    {label: 'Shop', path: '/collections/all'},
  ];

  if (tags.includes('dogs')) {
    crumbs.push({label: 'Dogs', path: '/collections/dogs'});
    const dogCat = DOG_CATEGORIES.find((c) => c.productType === product.productType);
    if (dogCat) crumbs.push({label: dogCat.title, path: dogCat.path});
  } else if (tags.includes('cats')) {
    crumbs.push({label: 'Cats', path: '/collections/cats'});
    const catCat = CAT_CATEGORIES.find((c) => c.productType === product.productType);
    if (catCat) crumbs.push({label: catCat.title, path: catCat.path});
  }

  crumbs.push({label: product.title ?? 'Product'});
  return crumbs;
}

/**
 * Filter products by fallback rules when Shopify collection is missing.
 * @param {Array<{tags?: string[]; productType?: string}>} products
 * @param {PawraCollectionFallback} rule
 */
export function filterProductsByRule(products, rule) {
  if (!rule) return products;

  return products.filter((product) => {
    const tags = (product.tags ?? []).map((t) => t.toLowerCase());

    if (rule.productType && product.productType !== rule.productType) {
      return false;
    }

    if (rule.species) {
      const speciesTag = rule.species.toLowerCase();
      if (!tags.includes(speciesTag) && !tags.some((t) => t.includes(speciesTag))) {
        return false;
      }
    }

    if (rule.tagsAll?.length) {
      const required = rule.tagsAll.map((t) => t.toLowerCase());
      if (!required.every((t) => tags.includes(t))) return false;
    }

    if (rule.tagsAny?.length) {
      const any = rule.tagsAny.map((t) => t.toLowerCase());
      if (!any.some((t) => tags.includes(t))) return false;
    }

    return true;
  });
}

/** Shopify Admin collection setup reference (create these in Admin → Products → Collections) */
export const SHOPIFY_COLLECTION_SETUP = [
  ...CURATED_COLLECTIONS.filter((c) => c.handle !== 'all').map((c) => ({
    handle: c.handle,
    title: c.title,
    type: 'automated',
    rules: c.tagsAny
      ? c.tagsAny.map((tag) => ({column: 'TAG', relation: 'EQUALS', condition: tag}))
      : c.tags
        ? c.tags.map((tag) => ({column: 'TAG', relation: 'EQUALS', condition: tag}))
        : [],
  })),
  ...DOG_CATEGORIES.map((c) => ({
    handle: c.handle,
    title: c.title,
    type: 'automated',
    rules: [
      {column: 'TAG', relation: 'EQUALS', condition: c.species},
      ...(c.productType
        ? [{column: 'TYPE', relation: 'EQUALS', condition: c.productType}]
        : []),
    ],
  })),
  ...CAT_CATEGORIES.map((c) => ({
    handle: c.handle,
    title: c.title,
    type: 'automated',
    rules: [
      {column: 'TAG', relation: 'EQUALS', condition: c.species},
      ...(c.productType
        ? [{column: 'TYPE', relation: 'EQUALS', condition: c.productType}]
        : []),
    ],
  })),
];
