/**
 * @file products.js
 * @description Mock PAWRA catalog tagged to Chewy-depth taxonomy leaf handles.
 */

/**
 * @typedef {{
 *   id: string;
 *   handle: string;
 *   title: string;
 *   tags: string[];
 *   productType?: string;
 *   featuredImage: { id: string; url: string; altText: string; width: number; height: number } | null;
 *   priceRange: { minVariantPrice: { amount: string; currencyCode: string }; maxVariantPrice: { amount: string; currencyCode: string } };
 *   compareAtPriceRange?: { minVariantPrice: { amount: string; currencyCode: string } | null };
 * }} MockProduct
 */

/**
 * @param {string} handle
 * @param {string} title
 * @param {string[]} tags
 * @param {string} amount
 * @param {{ compareAt?: string; image?: string; type?: string }} [opts]
 * @returns {MockProduct}
 */
function p(handle, title, tags, amount, opts = {}) {
  const imageUrl = opts.image || null;
  return {
    id: `mock-${handle}`,
    handle,
    title,
    tags,
    productType: opts.type || 'Pet Supplies',
    featuredImage: imageUrl
      ? {
          id: `img-${handle}`,
          url: imageUrl,
          altText: title,
          width: 800,
          height: 800,
        }
      : null,
    priceRange: {
      minVariantPrice: {amount, currencyCode: 'USD'},
      maxVariantPrice: {amount, currencyCode: 'USD'},
    },
    compareAtPriceRange: opts.compareAt
      ? {minVariantPrice: {amount: opts.compareAt, currencyCode: 'USD'}}
      : {minVariantPrice: null},
  };
}

const DOG = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop';
const CAT = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop';
const FOOD = 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&h=800&fit=crop';
const TOY = 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800&h=800&fit=crop';
const BED = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop';

/** @type {MockProduct[]} */
export const MOCK_PRODUCTS = [
  // Dog dry food leaves
  p(
    'grain-free-salmon-sweet-potato',
    'Grain-Free Salmon & Sweet Potato Recipe',
    ['dogs', 'dog-food', 'dry-dog-food', 'grain-free-dry-dog-food', 'sale'],
    '54.99',
    {compareAt: '64.99', image: FOOD, type: 'Dog Food'},
  ),
  p(
    'small-breed-chicken-kibble',
    'Small Breed Chicken Kibble',
    ['dogs', 'dog-food', 'dry-dog-food', 'small-breed-dry-dog-food'],
    '32.99',
    {image: FOOD, type: 'Dog Food'},
  ),
  p(
    'large-breed-beef-kibble',
    'Large Breed Beef & Brown Rice',
    ['dogs', 'dog-food', 'dry-dog-food', 'large-breed-dry-dog-food'],
    '59.99',
    {image: FOOD, type: 'Dog Food'},
  ),
  p(
    'senior-joint-support-kibble',
    'Senior Joint Support Dry Food',
    ['dogs', 'dog-food', 'dry-dog-food', 'senior-dry-dog-food'],
    '48.99',
    {image: FOOD, type: 'Dog Food'},
  ),
  p(
    'puppy-starter-kibble',
    'Puppy Starter Dry Food',
    ['dogs', 'dog-food', 'dry-dog-food', 'puppy-dry-dog-food'],
    '36.99',
    {image: FOOD, type: 'Dog Food'},
  ),
  // Wet dog
  p(
    'chicken-pate-dog',
    'Chicken Pâté Dog Food (12-Pack)',
    ['dogs', 'dog-food', 'wet-dog-food', 'pate-dog-food', 'sale'],
    '28.99',
    {compareAt: '34.99', image: FOOD, type: 'Dog Food'},
  ),
  p(
    'beef-stew-chunks-dog',
    'Beef Stew & Chunks',
    ['dogs', 'dog-food', 'wet-dog-food', 'stews-dog-food'],
    '26.99',
    {image: FOOD, type: 'Dog Food'},
  ),
  p(
    'puppy-wet-chicken',
    'Puppy Wet Chicken Dinner',
    ['dogs', 'dog-food', 'wet-dog-food', 'puppy-wet-dog-food'],
    '24.99',
    {image: FOOD, type: 'Dog Food'},
  ),
  p(
    'freeze-dried-raw-dog',
    'Freeze-Dried Raw Nuggets — Dog',
    ['dogs', 'dog-food', 'freeze-dried-dog-food'],
    '42.99',
    {image: FOOD, type: 'Dog Food'},
  ),
  // Rx dog food
  p(
    'rx-weight-control-dog',
    'Prescription Weight Control Dog Food',
    ['dogs', 'dog-food', 'prescription-dog-food', 'weight-control-dog', 'pharmacy', 'prescription-diets', 'rx-dog-food'],
    '72.99',
    {image: FOOD, type: 'Prescription'},
  ),
  p(
    'rx-joint-care-dog',
    'Prescription Joint Care Dog Food',
    ['dogs', 'dog-food', 'prescription-dog-food', 'joint-care-dog', 'pharmacy', 'rx-dog-food'],
    '74.99',
    {image: FOOD, type: 'Prescription'},
  ),
  p(
    'rx-urinary-dog',
    'Prescription Urinary Health Dog Food',
    ['dogs', 'dog-food', 'prescription-dog-food', 'urinary-health-dog', 'pharmacy', 'rx-dog-food'],
    '71.99',
    {image: FOOD, type: 'Prescription'},
  ),
  p(
    'rx-digestive-dog',
    'Prescription Digestive Care Dog Food',
    ['dogs', 'dog-food', 'prescription-dog-food', 'digestive-care-dog', 'pharmacy', 'rx-dog-food'],
    '69.99',
    {image: FOOD, type: 'Prescription'},
  ),
  // Dog treats
  p(
    'training-bites-dog',
    'Soft Training Bites',
    ['dogs', 'dog-treats', 'training-treats-dog', 'sale'],
    '12.99',
    {compareAt: '15.99', image: DOG, type: 'Treats'},
  ),
  p(
    'dental-chews-medium',
    'Daily Dental Chews — Medium',
    ['dogs', 'dog-treats', 'dental-chews-dog'],
    '18.99',
    {image: DOG, type: 'Treats'},
  ),
  p(
    'bully-sticks-natural',
    'Natural Bully Sticks (6-Pack)',
    ['dogs', 'dog-treats', 'natural-chews-dog'],
    '22.99',
    {image: DOG, type: 'Treats'},
  ),
  p(
    'soft-chewy-turkey',
    'Soft & Chewy Turkey Treats',
    ['dogs', 'dog-treats', 'soft-treats-dog'],
    '11.99',
    {image: DOG, type: 'Treats'},
  ),
  p(
    'freeze-dried-liver-dog',
    'Freeze-Dried Liver Treats',
    ['dogs', 'dog-treats', 'freeze-dried-treats-dog'],
    '16.99',
    {image: DOG, type: 'Treats'},
  ),
  // Dog toys
  p('plush-squirrel-toy', 'Plush Squirrel Toy', ['dogs', 'dog-toys', 'plush-dog-toys'], '14.99', {image: TOY}),
  p('durable-chew-ring', 'Durable Chew Ring', ['dogs', 'dog-toys', 'chew-dog-toys', 'sale'], '9.99', {compareAt: '12.99', image: TOY}),
  p('puzzle-feeder-dog', 'Interactive Puzzle Feeder', ['dogs', 'dog-toys', 'interactive-dog-toys'], '24.99', {image: TOY}),
  p('fetch-tennis-set', 'Fetch Ball Set (3-Pack)', ['dogs', 'dog-toys', 'fetch-dog-toys'], '11.99', {image: TOY}),
  p('rope-tug-xl', 'Rope & Tug XL', ['dogs', 'dog-toys', 'rope-dog-toys'], '13.99', {image: TOY}),
  // Dog beds
  p('ortho-memory-foam-bed', 'Orthopedic Memory Foam Bed', ['dogs', 'dog-beds', 'orthopedic-dog-beds'], '89.99', {image: BED}),
  p('donut-cuddler-bed', 'Donut Cuddler Bed', ['dogs', 'dog-beds', 'cuddler-dog-beds', 'sale'], '49.99', {compareAt: '59.99', image: BED}),
  p('cooling-gel-bed', 'Cooling Gel Bed', ['dogs', 'dog-beds', 'cooling-dog-beds'], '64.99', {image: BED}),
  p('travel-fold-bed', 'Travel Folding Bed', ['dogs', 'dog-beds', 'travel-dog-beds'], '39.99', {image: BED}),
  p('crate-pad-large', 'Crate Pad — Large', ['dogs', 'dog-beds', 'crate-pads-dog'], '29.99', {image: BED}),
  // Dog grooming
  p('oat-shampoo-dog', 'Oatmeal Shampoo & Conditioner', ['dogs', 'dog-grooming', 'dog-shampoo'], '16.99', {image: DOG}),
  p('slicker-brush-dog', 'Slicker Brush', ['dogs', 'dog-grooming', 'dog-brushes'], '12.99', {image: DOG}),
  p('ear-cleaner-dog', 'Gentle Ear Cleaner', ['dogs', 'dog-grooming', 'dog-ear-eye'], '11.99', {image: DOG}),
  p('dental-kit-dog', 'Dental Care Kit', ['dogs', 'dog-grooming', 'dog-dental-care'], '19.99', {image: DOG}),
  p('paw-balm-dog', 'Paw & Nose Balm', ['dogs', 'dog-grooming', 'dog-balms', 'sale'], '10.99', {compareAt: '13.99', image: DOG}),
  // Walk & travel
  p('leather-leash-dog', 'Premium Leather Leash', ['dogs', 'dog-walk-travel', 'dog-leashes'], '28.99', {image: DOG}),
  p('no-pull-harness', 'No-Pull Harness', ['dogs', 'dog-walk-travel', 'dog-harnesses'], '34.99', {image: DOG}),
  p('classic-collar-dog', 'Classic Collar', ['dogs', 'dog-walk-travel', 'dog-collars'], '18.99', {image: DOG}),
  p('travel-bowl-set', 'Travel Bowl & Bag Set', ['dogs', 'dog-walk-travel', 'dog-travel-gear'], '22.99', {image: DOG}),
  p('car-seat-belt-dog', 'Car Safety Seat Belt', ['dogs', 'dog-walk-travel', 'dog-car-safety'], '19.99', {image: DOG}),

  // Cat food
  p('indoor-cat-kibble', 'Indoor Cat Dry Food', ['cats', 'cat-food', 'dry-cat-food', 'indoor-dry-cat-food'], '29.99', {image: FOOD}),
  p('hairball-cat-kibble', 'Hairball Control Dry Food', ['cats', 'cat-food', 'dry-cat-food', 'hairball-dry-cat-food'], '31.99', {image: FOOD}),
  p('grain-free-cat-kibble', 'Grain-Free Turkey Dry Food', ['cats', 'cat-food', 'dry-cat-food', 'grain-free-dry-cat-food', 'sale'], '34.99', {compareAt: '39.99', image: FOOD}),
  p('salmon-pate-cat', 'Salmon Pâté (12-Pack)', ['cats', 'cat-food', 'wet-cat-food', 'cat-pate'], '22.99', {image: FOOD}),
  p('flaked-tuna-cat', 'Flaked Tuna in Gravy', ['cats', 'cat-food', 'wet-cat-food', 'cat-flaked'], '21.99', {image: FOOD}),
  p('kitten-wet-chicken', 'Kitten Wet Chicken', ['cats', 'cat-food', 'wet-cat-food', 'kitten-wet-cat-food'], '19.99', {image: FOOD}),
  p('freeze-dried-cat-raw', 'Freeze-Dried Raw Cat Food', ['cats', 'cat-food', 'freeze-dried-cat-food'], '38.99', {image: FOOD}),
  p('rx-urinary-cat', 'Prescription Urinary Cat Food', ['cats', 'cat-food', 'prescription-cat-food', 'urinary-health-cat', 'pharmacy', 'rx-cat-food'], '64.99', {image: FOOD, type: 'Prescription'}),
  p('rx-kidney-cat', 'Prescription Kidney Support Cat Food', ['cats', 'cat-food', 'prescription-cat-food', 'kidney-support-cat', 'pharmacy', 'rx-cat-food'], '66.99', {image: FOOD, type: 'Prescription'}),
  p('rx-weight-cat', 'Prescription Weight Control Cat Food', ['cats', 'cat-food', 'prescription-cat-food', 'weight-control-cat', 'pharmacy', 'rx-cat-food'], '62.99', {image: FOOD, type: 'Prescription'}),
  // Cat treats / toys / furniture / litter / grooming
  p('freeze-dried-minnows', 'Freeze-Dried Minnow Treats', ['cats', 'cat-treats', 'freeze-dried-cat-treats'], '9.99', {image: CAT}),
  p('dental-crunchies-cat', 'Dental Crunchies', ['cats', 'cat-treats', 'dental-cat-treats'], '8.99', {image: CAT}),
  p('organic-catnip', 'Organic Catnip & Silvervine', ['cats', 'cat-treats', 'catnip', 'sale'], '6.99', {compareAt: '8.99', image: CAT}),
  p('hairball-treats-cat', 'Hairball Control Treats', ['cats', 'cat-treats', 'hairball-cat-treats'], '7.99', {image: CAT}),
  p('feather-wand-cat', 'Feather Wand Toy', ['cats', 'cat-toys', 'wand-toys-cat'], '11.99', {image: TOY}),
  p('laser-pointer-cat', 'Safe Laser Toy', ['cats', 'cat-toys', 'laser-toys-cat'], '9.99', {image: TOY}),
  p('kicker-plush-cat', 'Plush Kicker Toy', ['cats', 'cat-toys', 'plush-cat-toys'], '12.99', {image: TOY}),
  p('auto-teaser-cat', 'Interactive Auto Teaser', ['cats', 'cat-toys', 'interactive-cat-toys'], '29.99', {image: TOY}),
  p('cloud-cat-bed', 'Cloud Cat Bed', ['cats', 'cat-beds-furniture', 'cat-beds'], '44.99', {image: BED}),
  p('condo-cat-tree', 'Cat Tree Condo', ['cats', 'cat-beds-furniture', 'cat-trees'], '119.99', {image: CAT}),
  p('window-perch-cat', 'Window Perch', ['cats', 'cat-beds-furniture', 'window-perches-cat'], '34.99', {image: CAT}),
  p('sisal-scratcher', 'Sisal Scratcher', ['cats', 'cat-beds-furniture', 'cat-scratchers'], '24.99', {image: CAT}),
  p('clumping-litter-20', 'Clumping Litter 20 lb', ['cats', 'cat-litter', 'clumping-litter'], '18.99', {image: CAT}),
  p('natural-flushable-litter', 'Natural Flushable Litter', ['cats', 'cat-litter', 'natural-litter'], '21.99', {image: CAT}),
  p('covered-litter-box', 'Covered Litter Box', ['cats', 'cat-litter', 'litter-boxes'], '39.99', {image: CAT}),
  p('litter-mat-scoop', 'Litter Mat & Scoop Set', ['cats', 'cat-litter', 'litter-accessories'], '16.99', {image: CAT}),
  p('gentle-cat-shampoo', 'Gentle Cat Shampoo', ['cats', 'cat-grooming', 'cat-shampoo'], '13.99', {image: CAT}),
  p('cat-comb-brush', 'De-Shedding Comb', ['cats', 'cat-grooming', 'cat-brushes'], '14.99', {image: CAT}),
  p('nail-clippers-cat', 'Cat Nail Clippers', ['cats', 'cat-grooming', 'cat-nail-care'], '9.99', {image: CAT}),

  // Pharmacy
  p('flea-tick-chew-dog', 'Flea & Tick Chew — Dogs', ['pharmacy', 'flea-tick', 'flea-tick-dog'], '49.99', {image: DOG, type: 'Pharmacy'}),
  p('flea-tick-spot-cat', 'Flea & Tick Spot-On — Cats', ['pharmacy', 'flea-tick', 'flea-tick-cat'], '44.99', {image: CAT, type: 'Pharmacy'}),
  p('heartworm-monthly-dog', 'Monthly Heartworm Prevention — Dogs', ['pharmacy', 'heartworm', 'heartworm-dog'], '54.99', {image: DOG, type: 'Pharmacy'}),
  p('heartworm-cat-chew', 'Heartworm Prevention — Cats', ['pharmacy', 'heartworm', 'heartworm-cat'], '42.99', {image: CAT, type: 'Pharmacy'}),
  p('joint-chews-dog', 'Joint Health Soft Chews', ['pharmacy', 'joint-medication', 'dogs'], '29.99', {image: DOG, type: 'Pharmacy'}),
  p('antibiotic-ointment-pet', 'Pet Antibiotic Ointment', ['pharmacy', 'antibiotics'], '15.99', {image: DOG, type: 'Pharmacy'}),

  // Small pets
  p('rabbit-pellets', 'Timothy Rabbit Pellets', ['small-pets', 'rabbit'], '14.99', {image: FOOD}),
  p('guinea-pig-hay', 'Guinea Pig Hay Blend', ['small-pets', 'guinea-pig'], '12.99', {image: FOOD}),
  p('hamster-habitat-kit', 'Hamster Habitat Kit', ['small-pets', 'hamster'], '39.99', {image: TOY}),
  p('bird-seed-mix', 'Premium Bird Seed Mix', ['small-pets', 'bird'], '11.99', {image: FOOD}),
  p('reptile-heat-lamp', 'Reptile Heat Lamp', ['small-pets', 'reptile'], '27.99', {image: TOY}),
];

/**
 * Filter mock products that include the taxonomy handle in tags.
 * @param {string} handle
 * @param {MockProduct[]} [products]
 */
export function getProductsByTag(handle, products = MOCK_PRODUCTS) {
  if (!handle) return products;
  const key = handle.toLowerCase();
  return products.filter((product) =>
    (product.tags || []).some((tag) => tag.toLowerCase() === key),
  );
}

/**
 * Today's Deals — sale tag or compare-at price.
 * @param {MockProduct[]} [products]
 */
export function getDealProducts(products = MOCK_PRODUCTS) {
  return products.filter((product) => {
    const tags = (product.tags || []).map((t) => t.toLowerCase());
    if (tags.includes('sale')) return true;
    const price = Number(product.priceRange?.minVariantPrice?.amount ?? 0);
    const compare = Number(product.compareAtPriceRange?.minVariantPrice?.amount ?? 0);
    return compare > price && price > 0;
  });
}

/**
 * @param {string} handle
 * @param {MockProduct[]} [products]
 */
export function getMockProductByHandle(handle, products = MOCK_PRODUCTS) {
  return products.find((p) => p.handle === handle) || null;
}

export default MOCK_PRODUCTS;
