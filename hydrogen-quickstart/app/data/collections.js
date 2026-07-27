/**
 * @file collections.js
 * @description Chewy-depth PAWRA collection taxonomy — handles, titles, nested children.
 */

/**
 * @typedef {{ handle: string; title: string; description?: string; children: TaxonomyNode[] }} TaxonomyNode
 */

/** @type {Record<string, TaxonomyNode>} */
export const COLLECTION_TAXONOMY = {
  dogs: {
    handle: 'dogs',
    title: 'Dogs',
    description: 'Food, treats, toys, beds, grooming, and gear for every dog.',
    children: [
      {
        handle: 'dog-food',
        title: 'Food',
        description: 'Dry, wet, freeze-dried, and prescription diets for dogs.',
        children: [
          {
            handle: 'dry-dog-food',
            title: 'Dry Food',
            children: [
              {handle: 'grain-free-dry-dog-food', title: 'Grain-Free Dry Food', children: []},
              {handle: 'small-breed-dry-dog-food', title: 'Small Breed Dry Food', children: []},
              {handle: 'large-breed-dry-dog-food', title: 'Large Breed Dry Food', children: []},
              {handle: 'senior-dry-dog-food', title: 'Senior Dry Food', children: []},
              {handle: 'puppy-dry-dog-food', title: 'Puppy Dry Food', children: []},
            ],
          },
          {
            handle: 'wet-dog-food',
            title: 'Wet Food',
            children: [
              {handle: 'pate-dog-food', title: 'Pâté', children: []},
              {handle: 'stews-dog-food', title: 'Stews & Chunks', children: []},
              {handle: 'puppy-wet-dog-food', title: 'Puppy Wet Food', children: []},
            ],
          },
          {handle: 'freeze-dried-dog-food', title: 'Freeze-Dried & Raw', children: []},
          {
            handle: 'prescription-dog-food',
            title: 'Prescription Diets',
            children: [
              {handle: 'weight-control-dog', title: 'Weight Control', children: []},
              {handle: 'joint-care-dog', title: 'Joint Care', children: []},
              {handle: 'urinary-health-dog', title: 'Urinary Health', children: []},
              {handle: 'digestive-care-dog', title: 'Digestive Care', children: []},
            ],
          },
        ],
      },
      {
        handle: 'dog-treats',
        title: 'Treats',
        description: 'Training treats, dental chews, and natural rewards.',
        children: [
          {handle: 'training-treats-dog', title: 'Training Treats', children: []},
          {handle: 'dental-chews-dog', title: 'Dental Chews', children: []},
          {handle: 'natural-chews-dog', title: 'Natural Chews', children: []},
          {handle: 'soft-treats-dog', title: 'Soft & Chewy Treats', children: []},
          {handle: 'freeze-dried-treats-dog', title: 'Freeze-Dried Treats', children: []},
        ],
      },
      {
        handle: 'dog-toys',
        title: 'Toys',
        description: 'Plush, chew, puzzle, fetch, and tug toys.',
        children: [
          {handle: 'plush-dog-toys', title: 'Plush Toys', children: []},
          {handle: 'chew-dog-toys', title: 'Chew Toys', children: []},
          {handle: 'interactive-dog-toys', title: 'Interactive & Puzzle Toys', children: []},
          {handle: 'fetch-dog-toys', title: 'Fetch & Balls', children: []},
          {handle: 'rope-dog-toys', title: 'Rope & Tug Toys', children: []},
        ],
      },
      {
        handle: 'dog-beds',
        title: 'Beds & Comfort',
        description: 'Orthopedic, cuddler, cooling, travel beds, and crate pads.',
        children: [
          {handle: 'orthopedic-dog-beds', title: 'Orthopedic Beds', children: []},
          {handle: 'cuddler-dog-beds', title: 'Donut & Cuddler Beds', children: []},
          {handle: 'cooling-dog-beds', title: 'Cooling Beds', children: []},
          {handle: 'travel-dog-beds', title: 'Travel Beds', children: []},
          {handle: 'crate-pads-dog', title: 'Crate Pads', children: []},
        ],
      },
      {
        handle: 'dog-grooming',
        title: 'Grooming & Wellness',
        description: 'Shampoo, brushes, dental, ear care, and balms.',
        children: [
          {handle: 'dog-shampoo', title: 'Shampoos & Conditioners', children: []},
          {handle: 'dog-brushes', title: 'Brushes & Combs', children: []},
          {handle: 'dog-ear-eye', title: 'Ear & Eye Care', children: []},
          {handle: 'dog-dental-care', title: 'Dental Care', children: []},
          {handle: 'dog-balms', title: 'Paw & Nose Balms', children: []},
        ],
      },
      {
        handle: 'dog-walk-travel',
        title: 'Walk & Travel',
        description: 'Leashes, harnesses, collars, and car safety.',
        children: [
          {handle: 'dog-leashes', title: 'Leashes', children: []},
          {handle: 'dog-harnesses', title: 'Harnesses', children: []},
          {handle: 'dog-collars', title: 'Collars', children: []},
          {handle: 'dog-travel-gear', title: 'Travel Bowls & Bags', children: []},
          {handle: 'dog-car-safety', title: 'Car Safety', children: []},
        ],
      },
    ],
  },
  cats: {
    handle: 'cats',
    title: 'Cats',
    description: 'Food, treats, toys, furniture, litter, and grooming for cats.',
    children: [
      {
        handle: 'cat-food',
        title: 'Food',
        description: 'Dry, wet, freeze-dried, and prescription diets for cats.',
        children: [
          {
            handle: 'dry-cat-food',
            title: 'Dry Food',
            children: [
              {handle: 'indoor-dry-cat-food', title: 'Indoor Cat Dry Food', children: []},
              {handle: 'hairball-dry-cat-food', title: 'Hairball Control Dry Food', children: []},
              {handle: 'grain-free-dry-cat-food', title: 'Grain-Free Dry Food', children: []},
            ],
          },
          {
            handle: 'wet-cat-food',
            title: 'Wet Food',
            children: [
              {handle: 'cat-pate', title: 'Pâté', children: []},
              {handle: 'cat-flaked', title: 'Flaked & Shredded', children: []},
              {handle: 'kitten-wet-cat-food', title: 'Kitten Wet Food', children: []},
            ],
          },
          {handle: 'freeze-dried-cat-food', title: 'Freeze-Dried & Raw', children: []},
          {
            handle: 'prescription-cat-food',
            title: 'Prescription Diets',
            children: [
              {handle: 'urinary-health-cat', title: 'Urinary Health', children: []},
              {handle: 'kidney-support-cat', title: 'Kidney Support', children: []},
              {handle: 'weight-control-cat', title: 'Weight Control', children: []},
            ],
          },
        ],
      },
      {
        handle: 'cat-treats',
        title: 'Treats',
        children: [
          {handle: 'freeze-dried-cat-treats', title: 'Freeze-Dried Treats', children: []},
          {handle: 'dental-cat-treats', title: 'Dental Treats', children: []},
          {handle: 'catnip', title: 'Catnip & Silvervine', children: []},
          {handle: 'hairball-cat-treats', title: 'Hairball Control Treats', children: []},
        ],
      },
      {
        handle: 'cat-toys',
        title: 'Toys',
        children: [
          {handle: 'wand-toys-cat', title: 'Wand Toys', children: []},
          {handle: 'laser-toys-cat', title: 'Laser Toys', children: []},
          {handle: 'plush-cat-toys', title: 'Plush & Kicker Toys', children: []},
          {handle: 'interactive-cat-toys', title: 'Interactive Toys', children: []},
        ],
      },
      {
        handle: 'cat-beds-furniture',
        title: 'Beds & Furniture',
        children: [
          {handle: 'cat-beds', title: 'Cat Beds', children: []},
          {handle: 'cat-trees', title: 'Cat Trees & Condos', children: []},
          {handle: 'window-perches-cat', title: 'Window Perches', children: []},
          {handle: 'cat-scratchers', title: 'Scratchers', children: []},
        ],
      },
      {
        handle: 'cat-litter',
        title: 'Litter & Litter Boxes',
        children: [
          {handle: 'clumping-litter', title: 'Clumping Litter', children: []},
          {handle: 'natural-litter', title: 'Natural & Flushable Litter', children: []},
          {handle: 'litter-boxes', title: 'Litter Boxes', children: []},
          {handle: 'litter-accessories', title: 'Litter Accessories', children: []},
        ],
      },
      {
        handle: 'cat-grooming',
        title: 'Grooming',
        children: [
          {handle: 'cat-shampoo', title: 'Shampoos', children: []},
          {handle: 'cat-brushes', title: 'Brushes & Combs', children: []},
          {handle: 'cat-nail-care', title: 'Nail Care', children: []},
        ],
      },
    ],
  },
  pharmacy: {
    handle: 'pharmacy',
    title: 'Pharmacy',
    description: 'Flea & tick, heartworm, joint care, antibiotics, and Rx diets.',
    children: [
      {
        handle: 'flea-tick',
        title: 'Flea & Tick',
        children: [
          {handle: 'flea-tick-dog', title: 'For Dogs', children: []},
          {handle: 'flea-tick-cat', title: 'For Cats', children: []},
        ],
      },
      {
        handle: 'heartworm',
        title: 'Heartworm',
        children: [
          {handle: 'heartworm-dog', title: 'For Dogs', children: []},
          {handle: 'heartworm-cat', title: 'For Cats', children: []},
        ],
      },
      {handle: 'joint-medication', title: 'Joint Health', children: []},
      {handle: 'antibiotics', title: 'Antibiotics', children: []},
      {
        handle: 'prescription-diets',
        title: 'Prescription Diets',
        children: [
          {handle: 'rx-dog-food', title: 'Dog Prescription Food', children: []},
          {handle: 'rx-cat-food', title: 'Cat Prescription Food', children: []},
        ],
      },
    ],
  },
  'small-pets': {
    handle: 'small-pets',
    title: 'Small Pets',
    description: 'Essentials for rabbits, guinea pigs, hamsters, birds, and reptiles.',
    children: [
      {handle: 'rabbit', title: 'Rabbit', children: []},
      {handle: 'guinea-pig', title: 'Guinea Pig', children: []},
      {handle: 'hamster', title: 'Hamster', children: []},
      {handle: 'bird', title: 'Bird', children: []},
      {handle: 'reptile', title: 'Reptile', children: []},
    ],
  },
  'todays-deals': {
    handle: 'todays-deals',
    title: "Today's Deals",
    description: 'Limited-time savings across the PAWRA catalog.',
    children: [],
  },
  'shop-all': {
    handle: 'shop-all',
    title: 'Shop All',
    description: 'Browse every PAWRA category in one place.',
    children: [],
  },
};

/** Top-level roots in display order */
export const TAXONOMY_ROOTS = [
  COLLECTION_TAXONOMY.dogs,
  COLLECTION_TAXONOMY.cats,
  COLLECTION_TAXONOMY.pharmacy,
  COLLECTION_TAXONOMY['small-pets'],
  COLLECTION_TAXONOMY['todays-deals'],
  COLLECTION_TAXONOMY['shop-all'],
];

/**
 * @param {string[]} handles
 * @returns {{ node: TaxonomyNode; ancestors: TaxonomyNode[]; pathHandles: string[] } | null}
 */
export function resolveTaxonomyPath(handles) {
  if (!handles?.length) return null;
  const [rootHandle, ...rest] = handles;
  let node = COLLECTION_TAXONOMY[rootHandle];
  if (!node || node.handle !== rootHandle) return null;

  /** @type {TaxonomyNode[]} */
  const ancestors = [];
  const pathHandles = [node.handle];

  for (const handle of rest) {
    ancestors.push(node);
    const next = (node.children || []).find((child) => child.handle === handle);
    if (!next) return null;
    node = next;
    pathHandles.push(node.handle);
  }

  return {node, ancestors, pathHandles};
}

/**
 * Build URL for a taxonomy path (handles from root → leaf).
 * @param {string[]} pathHandles
 */
export function taxonomyCollectionPath(pathHandles) {
  if (!pathHandles?.length) return '/collections';
  if (pathHandles.length === 1 && pathHandles[0] === 'shop-all') return '/collections';
  return `/collections/${pathHandles.join('/')}`;
}

/**
 * @param {TaxonomyNode[]} ancestors
 * @param {TaxonomyNode} node
 * @param {string[]} pathHandles
 */
export function buildTaxonomyBreadcrumbs(ancestors, node, pathHandles) {
  /** @type {Array<{ label: string; to?: string }>} */
  const items = [
    {label: 'Home', to: '/'},
    {label: 'Shop', to: '/collections'},
  ];

  ancestors.forEach((ancestor, index) => {
    items.push({
      label: ancestor.title,
      to: taxonomyCollectionPath(pathHandles.slice(0, index + 1)),
    });
  });

  items.push({label: node.title});
  return items;
}

/**
 * Child cards with full href paths.
 * @param {TaxonomyNode} node
 * @param {string[]} pathHandles
 */
export function getTaxonomyChildLinks(node, pathHandles) {
  return (node.children || []).map((child) => ({
    ...child,
    href: taxonomyCollectionPath([...pathHandles, child.handle]),
  }));
}

/**
 * Flatten all nodes for lookup by handle.
 * @returns {Map<string, { node: TaxonomyNode; pathHandles: string[] }>}
 */
export function flattenTaxonomy() {
  /** @type {Map<string, { node: TaxonomyNode; pathHandles: string[] }>} */
  const map = new Map();

  /**
   * @param {TaxonomyNode} node
   * @param {string[]} path
   */
  function walk(node, path) {
    const pathHandles = [...path, node.handle];
    map.set(node.handle, {node, pathHandles});
    (node.children || []).forEach((child) => walk(child, pathHandles));
  }

  Object.values(COLLECTION_TAXONOMY).forEach((root) => walk(root, []));
  return map;
}

export const TAXONOMY_BY_HANDLE = flattenTaxonomy();

/**
 * Mega-menu columns: each L2 category becomes a column with L3 links.
 * @param {'dogs' | 'cats' | string} rootHandle
 */
export function getMegaMenuColumns(rootHandle) {
  const root = COLLECTION_TAXONOMY[rootHandle];
  if (!root?.children?.length) return [];

  return root.children.map((column) => ({
    title: column.title,
    href: taxonomyCollectionPath([root.handle, column.handle]),
    links: (column.children || []).map((child) => ({
      title: child.title,
      href: taxonomyCollectionPath([root.handle, column.handle, child.handle]),
    })),
  }));
}
