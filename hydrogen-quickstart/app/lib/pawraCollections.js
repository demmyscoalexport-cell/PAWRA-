/**
 * PAWRA navigation collections — handles must exist in Shopify Admin
 * or use built-in keyword fallbacks until collections are created.
 */

/** @typedef {{ handle: string; title: string; description: string; path: string; productCountLabel?: string | null; fallbackKeywords?: string[]; filterTags?: string[] }} PawraCollection */

/** @type {PawraCollection[]} */
export const PAWRA_COLLECTIONS = [
  {
    handle: 'all',
    title: 'All Products',
    description: 'Every product for cats, dogs, and pet parents.',
    path: '/collections/all',
    productCountLabel: 'Shop all',
  },
  {
    handle: 'dogs',
    title: 'Dog Products',
    description: 'Food, beds, toys, collars, and wellness for dogs.',
    path: '/collections/dogs',
    fallbackKeywords: ['dog', 'puppy', 'canine'],
    filterTags: ['dog'],
  },
  {
    handle: 'cats',
    title: 'Cat Products',
    description: 'Food, beds, toys, and grooming essentials for cats.',
    path: '/collections/cats',
    fallbackKeywords: ['cat', 'kitten', 'feline', 'kitty'],
    filterTags: ['cat'],
  },
  {
    handle: 'food-treats',
    title: 'Food & Treats',
    description: 'Nutritious meals and treats for cats and dogs.',
    path: '/collections/food-treats',
    fallbackKeywords: ['food', 'treat', 'kibble', 'meal'],
    filterTags: ['food'],
  },
  {
    handle: 'beds-comfort',
    title: 'Beds & Comfort',
    description: 'Beds, blankets, and comfort essentials.',
    path: '/collections/beds-comfort',
    fallbackKeywords: ['bed', 'mat', 'blanket', 'cushion'],
    filterTags: ['beds'],
  },
  {
    handle: 'grooming-wellness',
    title: 'Grooming & Wellness',
    description: 'Grooming kits, supplements, and wellness products.',
    path: '/collections/grooming-wellness',
    fallbackKeywords: ['groom', 'brush', 'shampoo', 'wellness', 'supplement'],
    filterTags: ['grooming'],
  },
  {
    handle: 'frontpage',
    title: 'Featured',
    description: 'Hand-picked favorites from the PAWRA catalog.',
    path: '/collections/frontpage',
  },
];

/** @type {Record<string, { title: string; description: string; fallbackKeywords?: string[]; filterTags?: string[] }>} */
export const PAWRA_COLLECTION_FALLBACK = Object.fromEntries(
  PAWRA_COLLECTIONS.filter((c) => c.handle !== 'all').map((c) => [
    c.handle,
    {
      title: c.title,
      description: c.description,
      fallbackKeywords: c.fallbackKeywords,
      filterTags: c.filterTags,
    },
  ]),
);

/** @param {string} handle */
export function collectionPath(handle) {
  return handle === 'all' ? '/collections/all' : `/collections/${handle}`;
}

/**
 * Filter products by title keywords when a Shopify collection does not exist yet.
 * @param {Array<{ title?: string; tags?: string[] }>} products
 * @param {string[]} keywords
 */
export function filterProductsByKeywords(products, keywords) {
  if (!keywords?.length) return products;
  const lower = keywords.map((k) => k.toLowerCase());
  return products.filter((p) => {
    const title = (p.title ?? '').toLowerCase();
    const tagMatch = (p.tags ?? []).some((t) => lower.includes(t.toLowerCase()));
    const titleMatch = lower.some((kw) => title.includes(kw));
    return tagMatch || titleMatch;
  });
}

/**
 * Client-side species filter using product tags.
 * @param {Array<{ tags?: string[]; title?: string }>} products
 * @param {'dog' | 'cat' | 'all'} species
 */
export function filterProductsBySpecies(products, species) {
  if (!species || species === 'all') return products;
  return products.filter((p) => {
    const tags = (p.tags ?? []).map((t) => t.toLowerCase());
    if (tags.includes(species)) return true;
    const title = (p.title ?? '').toLowerCase();
    if (species === 'dog') return /\bdog|\bpuppy|\bcanine\b/.test(title);
    if (species === 'cat') return /\bcat|\bkitten|\bfeline|\bkitty\b/.test(title);
    return false;
  });
}

const FOOD_KEYWORDS = ['food', 'kibble', 'meal', 'diet', 'recipe', 'wet food', 'dry food'];
const TREAT_KEYWORDS = ['treat', 'treats', 'snack', 'snacks', 'chew', 'chews', 'biscuit', 'jerky'];

/**
 * Split Food vs Treats within the shared food-treats collection.
 * @param {Array<{ tags?: string[]; title?: string; productType?: string }>} products
 * @param {'food' | 'treats' | 'all' | null | undefined} category
 */
export function filterProductsByCategory(products, category) {
  if (!category || category === 'all') return products;

  return products.filter((p) => {
    const tags = (p.tags ?? []).map((t) => t.toLowerCase());
    const title = (p.title ?? '').toLowerCase();
    const productType = (p.productType ?? '').toLowerCase();
    const haystack = `${title} ${productType} ${tags.join(' ')}`;

    const isTreat =
      tags.some((t) => TREAT_KEYWORDS.includes(t)) ||
      TREAT_KEYWORDS.some((kw) => haystack.includes(kw));
    const isFood =
      tags.some((t) => FOOD_KEYWORDS.includes(t) || t === 'food') ||
      FOOD_KEYWORDS.some((kw) => haystack.includes(kw));

    if (category === 'treats') return isTreat;
    if (category === 'food') return isFood && !isTreat;
    return true;
  });
}

/**
 * Client-side price range filter.
 * @param {Array<{ priceRange?: { minVariantPrice?: { amount?: string } } }>} products
 * @param {number | null} min
 * @param {number | null} max
 */
export function filterProductsByPrice(products, min, max) {
  return products.filter((p) => {
    const amount = Number(p.priceRange?.minVariantPrice?.amount ?? 0);
    if (min != null && amount < min) return false;
    if (max != null && amount > max) return false;
    return true;
  });
}

/** @typedef {'featured' | 'price-asc' | 'price-desc' | 'newest'} SortOption */

/**
 * @param {Array<{ priceRange?: { minVariantPrice?: { amount?: string } } }>} products
 * @param {SortOption} sort
 */
export function sortProducts(products, sort) {
  const nodes = [...products];
  if (sort === 'price-asc') {
    nodes.sort(
      (a, b) =>
        Number(a.priceRange?.minVariantPrice?.amount ?? 0) -
        Number(b.priceRange?.minVariantPrice?.amount ?? 0),
    );
  } else if (sort === 'price-desc') {
    nodes.sort(
      (a, b) =>
        Number(b.priceRange?.minVariantPrice?.amount ?? 0) -
        Number(a.priceRange?.minVariantPrice?.amount ?? 0),
    );
  } else if (sort === 'newest') {
    nodes.reverse();
  }
  return nodes;
}

export const COLLECTION_SORT_OPTIONS = [
  {value: 'featured', label: 'Featured'},
  {value: 'price-asc', label: 'Price: low to high'},
  {value: 'price-desc', label: 'Price: high to low'},
  {value: 'newest', label: 'Newest'},
];

export const SPECIES_FILTER_OPTIONS = [
  {value: 'all', label: 'All pets'},
  {value: 'dog', label: 'Dogs'},
  {value: 'cat', label: 'Cats'},
];
