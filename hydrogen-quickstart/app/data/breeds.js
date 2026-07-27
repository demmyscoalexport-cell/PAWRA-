/**
 * @file breeds.js
 * @description Breed guide mock content with product tag links.
 */

export const BREEDS = [
  {
    slug: 'poodle',
    name: 'Poodle',
    species: 'Dog',
    summary: 'Intelligent, athletic, and often a good fit for allergy-conscious homes.',
    size: 'Toy / Miniature / Standard',
    energy: 'High',
    coat: 'Curly, low-shed',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=1000&h=700&fit=crop',
    tips: [
      'Regular grooming prevents mats.',
      'Mental enrichment toys reduce boredom.',
      'Many do well on grain-free or limited-ingredient diets when sensitivities appear.',
    ],
    productTags: ['small-breed-dry-dog-food', 'interactive-dog-toys', 'dog-grooming'],
  },
  {
    slug: 'labrador-retriever',
    name: 'Labrador Retriever',
    species: 'Dog',
    summary: 'Friendly, food-motivated companions who need joint-aware nutrition as they age.',
    size: 'Large',
    energy: 'High',
    coat: 'Short double coat',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f93?w=1000&h=700&fit=crop',
    tips: [
      'Watch calorie intake — Labs gain weight easily.',
      'Prioritize durable chew toys.',
      'Consider joint support after age 6–7.',
    ],
    productTags: ['large-breed-dry-dog-food', 'chew-dog-toys', 'joint-medication'],
  },
  {
    slug: 'domestic-shorthair',
    name: 'Domestic Shorthair',
    species: 'Cat',
    summary: 'Adaptable companion cats with varied personalities and indoor lifestyle needs.',
    size: 'Medium',
    energy: 'Moderate',
    coat: 'Short',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&h=700&fit=crop',
    tips: [
      'Vertical space (trees, perches) reduces stress.',
      'Indoor formulas support healthy weight.',
      'Weekly brushing cuts hairballs.',
    ],
    productTags: ['indoor-dry-cat-food', 'cat-trees', 'hairball-cat-treats'],
  },
  {
    slug: 'maine-coon',
    name: 'Maine Coon',
    species: 'Cat',
    summary: 'Large, gentle cats that benefit from sturdy furniture and coat care.',
    size: 'Large',
    energy: 'Moderate',
    coat: 'Long, dense',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1000&h=700&fit=crop',
    tips: [
      'Choose larger litter boxes and beds.',
      'Brush several times a week.',
      'Monitor joint comfort as they mature.',
    ],
    productTags: ['cat-beds', 'cat-brushes', 'dry-cat-food'],
  },
];

/** @param {string} slug */
export function getBreedBySlug(slug) {
  return BREEDS.find((b) => b.slug === slug) || null;
}

export default BREEDS;
