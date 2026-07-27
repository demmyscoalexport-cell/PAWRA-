/**
 * @file starterKits.js
 * @description First-purchase starter kits + new-pet quiz curation for pawrapetshop.com
 */

import {getMockProductByHandle, MOCK_PRODUCTS} from '~/data/products';
import {getProductImage} from '~/data/productImages';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';

/** Pet-didn't-love-it guarantee — primary risk reversal for first buyers */
export const PET_GUARANTEE = {
  title: '30-day Pet Guarantee',
  short: 'Pet didn’t love it? Free return within 30 days.',
  detail:
    'If your pet won’t eat it, wear it, or use it, start a return within 30 days of delivery. Unused items in original packaging are eligible. We make first purchases feel safe.',
};

/**
 * @typedef {{
 *   handle: string;
 *   title: string;
 *   species: 'dog' | 'cat';
 *   lifeStages: Array<'puppy' | 'kitten' | 'adult' | 'senior' | 'all'>;
 *   headline: string;
 *   description: string;
 *   image: string;
 *   productHandles: string[];
 *   bundlePrice: string;
 *   compareAtPrice: string;
 *   savingsLabel: string;
 * }} StarterKit
 */

/** @type {StarterKit[]} */
export const STARTER_KITS = [
  {
    handle: 'new-dog-starter',
    title: 'New Dog Starter Kit',
    species: 'dog',
    lifeStages: ['puppy', 'adult', 'all'],
    headline: 'Everything for the first 30 days',
    description:
      'Food, a treat, a no-pull harness, and a toy — curated for new dog parents. Free US shipping over $' +
      FREE_SHIPPING_THRESHOLD_USD +
      '.',
    image: getProductImage('no-pull-harness') || '/products/no-pull-harness.svg',
    productHandles: [
      'grain-free-salmon-sweet-potato',
      'durable-chew-ring',
      'no-pull-harness',
      'plush-squirrel-toy',
    ],
    bundlePrice: '99.00',
    compareAtPrice: '124.96',
    savingsLabel: 'Save ~$26 vs buying separate',
  },
  {
    handle: 'new-cat-starter',
    title: 'New Cat Starter Kit',
    species: 'cat',
    lifeStages: ['kitten', 'adult', 'all'],
    headline: 'Settle in with calm essentials',
    description:
      'Indoor food, a treat, litter basics, and a wand toy — a simple first order for new cat parents.',
    image: getProductImage('indoor-cat-kibble') || '/products/indoor-cat-kibble.svg',
    productHandles: [
      'indoor-cat-kibble',
      'organic-catnip',
      'clumping-litter-20',
      'feather-wand-cat',
    ],
    bundlePrice: '64.00',
    compareAtPrice: '77.96',
    savingsLabel: 'Save ~$14 vs buying separate',
  },
  {
    handle: 'senior-dog-comfort',
    title: 'Senior Dog Comfort Kit',
    species: 'dog',
    lifeStages: ['senior'],
    headline: 'Gentle care for older dogs',
    description: 'Joint support, a soft bed, dental care, and calming grooming — comfort first.',
    image: getProductImage('ortho-memory-foam-bed') || '/products/ortho-memory-foam-bed.svg',
    productHandles: [
      'joint-chews-dog',
      'ortho-memory-foam-bed',
      'dental-kit-dog',
      'oat-shampoo-dog',
    ],
    bundlePrice: '129.00',
    compareAtPrice: '155.96',
    savingsLabel: 'Save ~$27 vs buying separate',
  },
];

/** @param {string} handle */
export function getStarterKitByHandle(handle) {
  return STARTER_KITS.find((kit) => kit.handle === handle) || null;
}

/**
 * @param {StarterKit} kit
 */
export function getKitProducts(kit) {
  return kit.productHandles.map((handle) => getMockProductByHandle(handle)).filter(Boolean);
}

/**
 * Quiz question config
 */
export const QUIZ_STEPS = [
  {
    id: 'species',
    prompt: 'Who are we shopping for?',
    options: [
      {value: 'dog', label: 'Dog', hint: 'Puppy or adult'},
      {value: 'cat', label: 'Cat', hint: 'Kitten or adult'},
    ],
  },
  {
    id: 'lifeStage',
    prompt: 'What life stage?',
    optionsBySpecies: {
      dog: [
        {value: 'puppy', label: 'Puppy', hint: 'Under ~1 year'},
        {value: 'adult', label: 'Adult', hint: 'Everyday essentials'},
        {value: 'senior', label: 'Senior', hint: 'Comfort & joints'},
      ],
      cat: [
        {value: 'kitten', label: 'Kitten', hint: 'Growing fast'},
        {value: 'adult', label: 'Adult', hint: 'Indoor staples'},
        {value: 'senior', label: 'Senior', hint: 'Gentle care'},
      ],
    },
  },
  {
    id: 'priority',
    prompt: 'What matters most right now?',
    options: [
      {value: 'food', label: 'Nutrition', hint: 'Food & treats'},
      {value: 'comfort', label: 'Comfort', hint: 'Beds & calm spaces'},
      {value: 'play', label: 'Play & gear', hint: 'Toys, walks, enrichment'},
      {value: 'wellness', label: 'Wellness', hint: 'Grooming & prevention'},
    ],
  },
];

/**
 * @param {{ species?: string; lifeStage?: string; priority?: string }} answers
 */
export function resolveQuizResult(answers = {}) {
  const species = answers.species === 'cat' ? 'cat' : 'dog';
  const lifeStage = answers.lifeStage || 'adult';
  const priority = answers.priority || 'food';

  let kit =
    STARTER_KITS.find(
      (item) =>
        item.species === species &&
        (item.lifeStages.includes(/** @type {*} */ (lifeStage)) || item.lifeStages.includes('all')),
    ) || STARTER_KITS.find((item) => item.species === species);

  if (species === 'dog' && lifeStage === 'senior') {
    kit = getStarterKitByHandle('senior-dog-comfort') || kit;
  }
  if (species === 'dog' && (lifeStage === 'puppy' || lifeStage === 'adult')) {
    kit = getStarterKitByHandle('new-dog-starter') || kit;
  }
  if (species === 'cat') {
    kit = getStarterKitByHandle('new-cat-starter') || kit;
  }

  const tagPriority = {
    food: species === 'dog' ? ['dog-food', 'dog-treats'] : ['cat-food', 'cat-treats'],
    comfort: species === 'dog' ? ['dog-beds'] : ['cat-beds-furniture', 'cat-beds'],
    play: species === 'dog' ? ['dog-toys', 'dog-walk-travel'] : ['cat-toys'],
    wellness: species === 'dog' ? ['dog-grooming', 'pharmacy'] : ['cat-grooming', 'pharmacy'],
  };

  const tags = tagPriority[priority] || tagPriority.food;
  const extras = MOCK_PRODUCTS.filter((product) => {
    const productTags = (product.tags || []).map((t) => t.toLowerCase());
    if (species === 'dog' && !productTags.includes('dogs') && !productTags.includes('pharmacy')) {
      return false;
    }
    if (species === 'cat' && !productTags.includes('cats') && !productTags.includes('pharmacy')) {
      return false;
    }
    return tags.some((tag) => productTags.includes(tag));
  }).slice(0, 6);

  const kitProducts = kit ? getKitProducts(kit) : [];
  const kitHandles = new Set(kitProducts.map((p) => p.handle));
  const recommended = [
    ...kitProducts,
    ...extras.filter((p) => !kitHandles.has(p.handle)),
  ].slice(0, 8);

  return {
    species,
    lifeStage,
    priority,
    kit,
    recommended,
    guarantee: PET_GUARANTEE,
  };
}
