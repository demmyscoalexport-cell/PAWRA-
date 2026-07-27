/**
 * @file platform.js
 * @description Mock data for Care platform: account hub, pharmacy, telehealth, loyalty, registries.
 */

/** Demo customer used when Shopify customer name is unavailable */
export const MOCK_ACCOUNT_USER = {
  name: 'Alex',
  loyaltyPoints: 1250,
  tier: 'Gold',
  nextTier: null,
  pointsToNextTier: 0,
  tierThresholds: {Bronze: 0, Silver: 500, Gold: 1000},
};

/** @type {Array<{id: string; name: string; species: string; breed: string; age: number; weight: number; dietary: string; allergies: string; image: string; lifeStage: string}>} */
export const MOCK_PETS = [
  {
    id: '1',
    name: 'Max',
    species: 'Dog',
    breed: 'Poodle',
    age: 3,
    weight: 22,
    dietary: 'Grain-free',
    allergies: 'Chicken',
    lifeStage: 'adult',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: 5,
    weight: 9,
    dietary: 'Indoor',
    allergies: 'None',
    lifeStage: 'adult',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
  },
];

/** @param {string} id */
export function getMockPetById(id) {
  return MOCK_PETS.find((pet) => pet.id === String(id)) || null;
}

export const MOCK_HEALTH_RECORDS = {
  '1': {
    vaccines: [
      {id: 'v1', name: 'Rabies', date: '2025-09-12', nextDue: '2026-09-12'},
      {id: 'v2', name: 'DHPP', date: '2025-09-12', nextDue: '2026-09-12'},
      {id: 'v3', name: 'Bordetella', date: '2026-01-08', nextDue: '2027-01-08'},
    ],
    weights: [
      {date: '2025-07-01', lbs: 20},
      {date: '2025-10-01', lbs: 21},
      {date: '2026-01-01', lbs: 21.5},
      {date: '2026-04-01', lbs: 22},
      {date: '2026-07-01', lbs: 22},
    ],
    medications: [
      {id: 'm1', name: 'Heartworm prevention', schedule: 'Monthly', nextDose: '2026-08-01', reminder: true},
      {id: 'm2', name: 'Flea & tick', schedule: 'Monthly', nextDose: '2026-08-05', reminder: true},
    ],
  },
  '2': {
    vaccines: [
      {id: 'v4', name: 'FVRCP', date: '2025-11-02', nextDue: '2026-11-02'},
      {id: 'v5', name: 'Rabies', date: '2025-11-02', nextDue: '2026-11-02'},
    ],
    weights: [
      {date: '2025-08-01', lbs: 8.5},
      {date: '2026-01-01', lbs: 8.8},
      {date: '2026-06-01', lbs: 9},
    ],
    medications: [
      {id: 'm3', name: 'Hairball gel', schedule: 'As needed', nextDose: '—', reminder: false},
    ],
  },
};

export const MOCK_SUBSCRIPTIONS = [
  {
    id: 'sub-1',
    productHandle: 'grain-free-salmon-sweet-potato',
    product: 'Grain-Free Salmon & Sweet Potato Recipe',
    nextCharge: '2026-08-15',
    status: 'Active',
    quantity: 2,
    frequency: 'Every 4 weeks',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200&h=200&fit=crop',
  },
  {
    id: 'sub-2',
    productHandle: 'clumping-litter-20',
    product: 'Clumping Litter 20 lb',
    nextCharge: '2026-08-22',
    status: 'Active',
    quantity: 1,
    frequency: 'Every 6 weeks',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
  },
];

export const MOCK_ORDERS_RECENT = [
  {id: '1042', date: '2026-07-12', total: '$87.45', status: 'Delivered', items: 3},
  {id: '1038', date: '2026-06-28', total: '$54.99', status: 'Delivered', items: 1},
  {id: '1031', date: '2026-06-10', total: '$122.10', status: 'Delivered', items: 4},
];

export const MOCK_HEALTH_REMINDERS = [
  {id: 'r1', petName: 'Max', label: 'Heartworm dose due', date: '2026-08-01'},
  {id: 'r2', petName: 'Max', label: 'Rabies vaccine due', date: '2026-09-12'},
  {id: 'r3', petName: 'Luna', label: 'FVRCP vaccine due', date: '2026-11-02'},
];

export const LOYALTY_REWARDS = [
  {id: 'rw1', title: 'Free shipping', points: 200, description: 'Apply free shipping on your next order'},
  {id: 'rw2', title: '$10 off', points: 500, description: 'Save $10 on orders over $50'},
  {id: 'rw3', title: '$25 off', points: 1000, description: 'Save $25 on orders over $100'},
  {id: 'rw4', title: 'Free treat bundle', points: 750, description: 'Complimentary treat sampler'},
];

export const LOYALTY_HISTORY = [
  {id: 'lh1', date: '2026-07-12', label: 'Order #1042', points: 87, type: 'earn'},
  {id: 'lh2', date: '2026-06-28', label: 'Order #1038', points: 55, type: 'earn'},
  {id: 'lh3', date: '2026-06-01', label: 'Redeemed free shipping', points: -200, type: 'redeem'},
  {id: 'lh4', date: '2026-05-15', label: 'Referral bonus — Jordan', points: 100, type: 'earn'},
];

export const MOCK_REFERRALS = {
  shareLink: 'https://pawrapetshop.com/r/alex-gold',
  creditEarned: 30,
  friends: [
    {id: 'f1', name: 'Jordan M.', status: 'Joined', credit: 10, date: '2026-05-15'},
    {id: 'f2', name: 'Sam R.', status: 'Pending', credit: 0, date: '2026-07-02'},
  ],
};

export const MOCK_REGISTRIES = [
  {
    id: 'new-puppy-max',
    occasion: 'New Puppy',
    recipient: 'Max',
    date: '2026-09-01',
    progress: 0.45,
    items: [
      {handle: 'no-pull-harness', title: 'No-Pull Harness', price: '34.99', purchased: true},
      {handle: 'plush-squirrel-toy', title: 'Plush Squirrel Toy', price: '14.99', purchased: false},
      {handle: 'donut-cuddler-bed', title: 'Donut Cuddler Bed', price: '49.99', purchased: false},
      {handle: 'grain-free-salmon-sweet-potato', title: 'Grain-Free Salmon Recipe', price: '54.99', purchased: true},
    ],
  },
];

/** @param {string} id */
export function getMockRegistryById(id) {
  return MOCK_REGISTRIES.find((r) => r.id === id) || null;
}

export const MOCK_PRESCRIPTION_STATUS = {
  id: 'rx-8842',
  product: 'Prescription Joint Care Dog Food',
  petName: 'Max',
  steps: ['Pending Vet Approval', 'Approved', 'Processing', 'Shipped'],
  currentStep: 1,
  updatedAt: '2026-07-20',
};

export const MOCK_VET_CHAT = [
  {
    id: 'c1',
    from: 'vet',
    name: 'Dr. Priya Patel, DVM',
    text: 'Hi! I’m Dr. Patel. How can I help Max or Luna today?',
    time: '10:02 AM',
  },
  {
    id: 'c2',
    from: 'user',
    name: 'You',
    text: 'Max has been itching after meals — could it be a food allergy?',
    time: '10:03 AM',
  },
  {
    id: 'c3',
    from: 'vet',
    name: 'Dr. Priya Patel, DVM',
    text: 'Itching after meals can suggest a food sensitivity. Chicken is a common trigger. I can recommend a grain-free limited-ingredient option and walk you through an elimination diet.',
    time: '10:04 AM',
  },
];

export const TELEHEALTH_SLOTS = [
  {id: 's1', date: '2026-07-28', time: '9:00 AM', available: true},
  {id: 's2', date: '2026-07-28', time: '10:30 AM', available: true},
  {id: 's3', date: '2026-07-28', time: '2:00 PM', available: false},
  {id: 's4', date: '2026-07-29', time: '11:00 AM', available: true},
  {id: 's5', date: '2026-07-29', time: '3:30 PM', available: true},
  {id: 's6', date: '2026-07-30', time: '9:30 AM', available: true},
];

export const SYMPTOM_GUIDE = {
  vomiting: {
    label: 'Vomiting',
    conditions: ['Dietary indiscretion', 'Food intolerance', 'Gastroenteritis'],
    products: ['rx-digestive-dog', 'grain-free-salmon-sweet-potato'],
    article: '/blog/choosing-premium-pet-food',
  },
  itching: {
    label: 'Itching / skin irritation',
    conditions: ['Food allergy', 'Flea allergy dermatitis', 'Environmental allergens'],
    products: ['oat-shampoo-dog', 'grain-free-salmon-sweet-potato', 'flea-tick-chew-dog'],
    article: '/blog/grooming-essentials',
  },
  limping: {
    label: 'Limping',
    conditions: ['Soft tissue strain', 'Joint discomfort', 'Paw injury'],
    products: ['joint-chews-dog', 'rx-joint-care-dog', 'paw-balm-dog'],
    article: '/health/symptom-checker',
  },
  lethargy: {
    label: 'Lethargy',
    conditions: ['Mild illness', 'Dehydration', 'Underlying infection'],
    products: ['heartworm-monthly-dog'],
    article: '/telehealth',
  },
};

export const TRACK_ORDER_DEMO = {
  orderNumber: '1042',
  email: 'alex@example.com',
  status: 'Out for delivery',
  carrier: 'UPS',
  trackingNumber: '1Z999AA10123456784',
  timeline: [
    {label: 'Order placed', date: 'Jul 12, 9:14 AM', done: true},
    {label: 'Packed at warehouse', date: 'Jul 12, 4:02 PM', done: true},
    {label: 'In transit', date: 'Jul 13, 8:20 AM', done: true},
    {label: 'Out for delivery', date: 'Jul 14, 7:45 AM', done: true},
    {label: 'Delivered', date: 'Expected today', done: false},
  ],
};

export const PRESS_LOGOS = [
  {name: 'Vet Weekly', initials: 'VW'},
  {name: 'Pet Living', initials: 'PL'},
  {name: 'Canine Review', initials: 'CR'},
  {name: 'Feline Today', initials: 'FT'},
  {name: 'Wellness Pets', initials: 'WP'},
];

export const UGC_GALLERY = [
  {
    id: 'ugc1',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
    alt: 'Dog with PAWRA harness',
    productHandle: 'no-pull-harness',
    productTitle: 'No-Pull Harness',
  },
  {
    id: 'ugc2',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
    alt: 'Cat on window perch',
    productHandle: 'window-perch-cat',
    productTitle: 'Window Perch',
  },
  {
    id: 'ugc3',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
    alt: 'Dog resting on bed',
    productHandle: 'donut-cuddler-bed',
    productTitle: 'Donut Cuddler Bed',
  },
  {
    id: 'ugc4',
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600&h=600&fit=crop',
    alt: 'Dog with plush toy',
    productHandle: 'plush-squirrel-toy',
    productTitle: 'Plush Squirrel Toy',
  },
  {
    id: 'ugc5',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop',
    alt: 'Cat with treats',
    productHandle: 'freeze-dried-minnows',
    productTitle: 'Freeze-Dried Minnow Treats',
  },
  {
    id: 'ugc6',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop',
    alt: 'Dog on a walk',
    productHandle: 'leather-leash-dog',
    productTitle: 'Premium Leather Leash',
  },
];

export const MOCK_PHOTO_REVIEWS = [
  {
    id: 'pr1',
    author: 'Elena R.',
    rating: 5,
    text: 'Max loves this food — coat looks amazing.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
  },
  {
    id: 'pr2',
    author: 'Chris T.',
    rating: 5,
    text: 'Autoship is a lifesaver. Never run out.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
  },
  {
    id: 'pr3',
    author: 'Maya L.',
    rating: 4,
    text: 'Great quality harness. Easy to adjust.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
  },
];
