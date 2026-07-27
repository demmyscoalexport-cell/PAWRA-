/**
 * @file articles.js
 * @description PAWRA Journal mock articles for blog index and article pages.
 */

export const ARTICLES = [
  {
    slug: 'choosing-premium-pet-food',
    category: 'Nutrition',
    title: 'How to choose premium pet food for cats and dogs',
    date: '2025-03-12',
    readTime: '6 min',
    excerpt:
      'A practical guide to reading labels, understanding ingredients, and picking the right food for your pet.',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=1200&h=700&fit=crop',
    topicTags: ['dog-food', 'cat-food', 'grain-free-dry-dog-food'],
    body: `
      <p>Choosing food is one of the most important decisions you make for your pet. Start with life stage, then activity level, then any dietary restrictions.</p>
      <h2>Read the ingredient panel</h2>
      <p>Look for named proteins first, clear fat sources, and limited fillers. Grain-free can help some pets — but it is not automatically better for every dog or cat.</p>
      <h2>Match diet to needs</h2>
      <p>Senior pets often benefit from joint support. Puppies and kittens need higher calorie density. Indoor cats may need hairball and weight management formulas.</p>
      <h2>When to ask a vet</h2>
      <p>Chronic itching, vomiting, or unexplained weight changes deserve a professional consult. PAWRA Telehealth can help you decide next steps quickly.</p>
    `,
  },
  {
    slug: 'best-pet-beds-guide',
    category: 'Comfort',
    title: 'The complete guide to pet beds and comfort',
    date: '2025-02-28',
    readTime: '5 min',
    excerpt:
      'From orthopedic options to washable covers — what to look for when shopping for your cat or dog.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=700&fit=crop',
    topicTags: ['dog-beds', 'cat-beds'],
    body: `
      <p>A good bed supports joints, regulates temperature, and survives laundry day. Measure your pet stretched out before you buy.</p>
      <h2>Orthopedic vs cuddler</h2>
      <p>Orthopedic foam suits seniors and large breeds. Cuddlers suit burrowers and smaller dogs who prefer enclosed sides.</p>
      <h2>Care tips</h2>
      <p>Removable covers and waterproof liners make weekly washing easier — and keep allergies under control.</p>
    `,
  },
  {
    slug: 'grooming-essentials',
    category: 'Wellness',
    title: 'Grooming essentials every pet owner needs',
    date: '2025-01-15',
    readTime: '4 min',
    excerpt:
      'Brushes, shampoos, nail care, and dental products that keep cats and dogs healthy at home.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&h=700&fit=crop',
    topicTags: ['dog-grooming', 'cat-grooming'],
    body: `
      <p>Consistent grooming prevents mats, reduces shedding around the house, and helps you spot skin issues early.</p>
      <h2>Start simple</h2>
      <p>A slicker brush, gentle shampoo, nail clippers, and a dental kit cover most households.</p>
    `,
  },
  {
    slug: 'training-treats-that-work',
    category: 'Training',
    title: 'Training treats that actually motivate',
    date: '2026-01-08',
    readTime: '4 min',
    excerpt: 'Soft, high-value rewards make positive reinforcement easier — without overfeeding.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=700&fit=crop',
    topicTags: ['dog-treats', 'training-treats-dog'],
    body: `
      <p>Use pea-sized soft treats for repetition-heavy sessions. Save higher-value rewards for new or difficult behaviors.</p>
    `,
  },
  {
    slug: 'senior-pet-joint-care',
    category: 'Health',
    title: 'Joint care basics for senior pets',
    date: '2026-03-22',
    readTime: '7 min',
    excerpt: 'Nutrition, supplements, and comfort changes that help aging dogs and cats stay mobile.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=700&fit=crop',
    topicTags: ['joint-medication', 'senior-dry-dog-food'],
    body: `
      <p>Mobility changes often show up as hesitation on stairs or shorter walks. Early support — diet, chews, and softer bedding — can help.</p>
      <p>Talk with a vet before starting prescription diets or new medications. PAWRA Pharmacy can coordinate Rx fulfillment once approved.</p>
    `,
  },
];

/** @param {string} slug */
export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
}

export default ARTICLES;
