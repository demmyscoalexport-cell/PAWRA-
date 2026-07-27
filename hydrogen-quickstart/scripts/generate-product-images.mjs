/**
 * Generate professional PAWRA studio product images (SVG) for every mock catalog SKU.
 * Output: public/products/{handle}.svg
 *
 * Run: node scripts/generate-product-images.mjs
 */

import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'products');

/** Brand tokens */
const FOREST = '#1B3A2D';
const OAT = '#F5F0E8';
const CREAM = '#FFFBF6';
const JADE = '#2EE8A0';
const CORAL = '#FF6B5B';
const MUTED = '#8A857C';

/**
 * Catalog entries — keep in sync with app/data/products.js handles.
 * category drives silhouette + accent palette.
 */
const PRODUCTS = [
  // Dog dry food
  ['grain-free-salmon-sweet-potato', 'Salmon & Sweet Potato', 'dry-bag', 'salmon'],
  ['small-breed-chicken-kibble', 'Small Breed Chicken', 'dry-bag', 'chicken'],
  ['large-breed-beef-kibble', 'Large Breed Beef', 'dry-bag', 'beef'],
  ['senior-joint-support-kibble', 'Senior Joint Support', 'dry-bag', 'joint'],
  ['puppy-starter-kibble', 'Puppy Starter', 'dry-bag', 'puppy'],
  // Wet dog
  ['chicken-pate-dog', 'Chicken Pâté 12-Pack', 'cans', 'chicken'],
  ['beef-stew-chunks-dog', 'Beef Stew & Chunks', 'cans', 'beef'],
  ['puppy-wet-chicken', 'Puppy Wet Dinner', 'cans', 'puppy'],
  ['freeze-dried-raw-dog', 'Freeze-Dried Raw', 'tub', 'raw'],
  // Rx dog
  ['rx-weight-control-dog', 'Rx Weight Control', 'rx-bag', 'rx'],
  ['rx-joint-care-dog', 'Rx Joint Care', 'rx-bag', 'rx'],
  ['rx-urinary-dog', 'Rx Urinary Health', 'rx-bag', 'rx'],
  ['rx-digestive-dog', 'Rx Digestive Care', 'rx-bag', 'rx'],
  // Treats
  ['training-bites-dog', 'Soft Training Bites', 'pouch', 'treat'],
  ['dental-chews-medium', 'Daily Dental Chews', 'pouch', 'dental'],
  ['bully-sticks-natural', 'Natural Bully Sticks', 'pouch', 'chew'],
  ['soft-chewy-turkey', 'Soft Turkey Treats', 'pouch', 'turkey'],
  ['freeze-dried-liver-dog', 'Freeze-Dried Liver', 'tub', 'liver'],
  // Toys
  ['plush-squirrel-toy', 'Plush Squirrel', 'plush', 'toy'],
  ['durable-chew-ring', 'Durable Chew Ring', 'ring', 'toy'],
  ['puzzle-feeder-dog', 'Puzzle Feeder', 'puzzle', 'toy'],
  ['fetch-tennis-set', 'Fetch Ball Set', 'balls', 'toy'],
  ['rope-tug-xl', 'Rope & Tug XL', 'rope', 'toy'],
  // Beds
  ['ortho-memory-foam-bed', 'Ortho Memory Foam', 'bed', 'bed'],
  ['donut-cuddler-bed', 'Donut Cuddler', 'donut', 'bed'],
  ['cooling-gel-bed', 'Cooling Gel Bed', 'bed', 'cool'],
  ['travel-fold-bed', 'Travel Folding Bed', 'bed', 'travel'],
  ['crate-pad-large', 'Crate Pad Large', 'pad', 'bed'],
  // Grooming dog
  ['oat-shampoo-dog', 'Oatmeal Shampoo', 'bottle', 'groom'],
  ['slicker-brush-dog', 'Slicker Brush', 'brush', 'groom'],
  ['ear-cleaner-dog', 'Gentle Ear Cleaner', 'dropper', 'groom'],
  ['dental-kit-dog', 'Dental Care Kit', 'kit', 'dental'],
  ['paw-balm-dog', 'Paw & Nose Balm', 'tin', 'balm'],
  // Walk
  ['leather-leash-dog', 'Premium Leather Leash', 'leash', 'walk'],
  ['no-pull-harness', 'No-Pull Harness', 'harness', 'walk'],
  ['classic-collar-dog', 'Classic Collar', 'collar', 'walk'],
  ['travel-bowl-set', 'Travel Bowl Set', 'bowls', 'travel'],
  ['car-seat-belt-dog', 'Car Safety Belt', 'belt', 'walk'],
  // Cat food
  ['indoor-cat-kibble', 'Indoor Cat Dry', 'dry-bag', 'cat'],
  ['hairball-cat-kibble', 'Hairball Control', 'dry-bag', 'cat'],
  ['grain-free-cat-kibble', 'Grain-Free Turkey', 'dry-bag', 'turkey'],
  ['salmon-pate-cat', 'Salmon Pâté 12-Pack', 'cans', 'salmon'],
  ['flaked-tuna-cat', 'Flaked Tuna Gravy', 'cans', 'tuna'],
  ['kitten-wet-chicken', 'Kitten Wet Chicken', 'cans', 'chicken'],
  ['freeze-dried-cat-raw', 'Freeze-Dried Raw Cat', 'tub', 'raw'],
  ['rx-urinary-cat', 'Rx Urinary Cat', 'rx-bag', 'rx'],
  ['rx-kidney-cat', 'Rx Kidney Support', 'rx-bag', 'rx'],
  ['rx-weight-cat', 'Rx Weight Control Cat', 'rx-bag', 'rx'],
  // Cat treats/toys/furniture/litter/groom
  ['freeze-dried-minnows', 'Freeze-Dried Minnows', 'tub', 'fish'],
  ['dental-crunchies-cat', 'Dental Crunchies', 'pouch', 'dental'],
  ['organic-catnip', 'Catnip & Silvervine', 'pouch', 'catnip'],
  ['hairball-treats-cat', 'Hairball Treats', 'pouch', 'treat'],
  ['feather-wand-cat', 'Feather Wand', 'wand', 'toy'],
  ['laser-pointer-cat', 'Safe Laser Toy', 'laser', 'toy'],
  ['kicker-plush-cat', 'Plush Kicker', 'plush', 'toy'],
  ['auto-teaser-cat', 'Auto Teaser', 'gadget', 'toy'],
  ['cloud-cat-bed', 'Cloud Cat Bed', 'donut', 'bed'],
  ['condo-cat-tree', 'Cat Tree Condo', 'tree', 'furniture'],
  ['window-perch-cat', 'Window Perch', 'perch', 'furniture'],
  ['sisal-scratcher', 'Sisal Scratcher', 'scratcher', 'furniture'],
  ['clumping-litter-20', 'Clumping Litter 20lb', 'litter-bag', 'litter'],
  ['natural-flushable-litter', 'Natural Flushable', 'litter-bag', 'litter'],
  ['covered-litter-box', 'Covered Litter Box', 'litter-box', 'litter'],
  ['litter-mat-scoop', 'Litter Mat & Scoop', 'kit', 'litter'],
  ['gentle-cat-shampoo', 'Gentle Cat Shampoo', 'bottle', 'groom'],
  ['cat-comb-brush', 'De-Shedding Comb', 'brush', 'groom'],
  ['nail-clippers-cat', 'Cat Nail Clippers', 'clippers', 'groom'],
  // Pharmacy
  ['flea-tick-chew-dog', 'Flea & Tick Chew', 'pharma-box', 'rx'],
  ['flea-tick-spot-cat', 'Flea & Tick Spot-On', 'pharma-box', 'rx'],
  ['heartworm-monthly-dog', 'Heartworm Monthly', 'pharma-box', 'rx'],
  ['heartworm-cat-chew', 'Heartworm Cat', 'pharma-box', 'rx'],
  ['joint-chews-dog', 'Joint Soft Chews', 'pharma-box', 'joint'],
  ['antibiotic-ointment-pet', 'Antibiotic Ointment', 'tube', 'rx'],
  // Small pets
  ['rabbit-pellets', 'Timothy Rabbit Pellets', 'dry-bag', 'hay'],
  ['guinea-pig-hay', 'Guinea Pig Hay', 'dry-bag', 'hay'],
  ['hamster-habitat-kit', 'Hamster Habitat', 'habitat', 'small'],
  ['bird-seed-mix', 'Premium Bird Seed', 'dry-bag', 'seed'],
  ['reptile-heat-lamp', 'Reptile Heat Lamp', 'lamp', 'reptile'],
];

const ACCENTS = {
  salmon: '#E07A5F',
  chicken: '#D4A373',
  beef: '#9B2226',
  joint: '#6B8F71',
  puppy: '#E9C46A',
  raw: '#8D99AE',
  rx: '#457B9D',
  treat: '#BC6C25',
  dental: '#48A9A6',
  chew: '#A47148',
  turkey: '#C1666B',
  liver: '#7F5539',
  toy: '#2A9D8F',
  bed: '#6D6875',
  cool: '#4ECDC4',
  travel: '#588157',
  groom: '#ADB5BD',
  balm: '#C9A227',
  walk: '#3D405B',
  cat: '#9A8C98',
  tuna: '#1D3557',
  fish: '#457B9D',
  catnip: '#52B788',
  furniture: '#8B7355',
  litter: '#A8A29E',
  hay: '#B5A642',
  seed: '#BC6C25',
  small: '#E76F51',
  reptile: '#2A9D8F',
};

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTitle(title, max = 18) {
  if (title.length <= max) return [title];
  const words = title.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

function productArt(shape, accent) {
  switch (shape) {
    case 'dry-bag':
      return `
        <path d="M280 210 L520 210 L545 620 L255 620 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <path d="M280 210 L400 160 L520 210" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="310" y="280" width="180" height="220" rx="12" fill="${FOREST}"/>
        <circle cx="400" cy="360" r="36" fill="${JADE}" opacity="0.9"/>
        <ellipse cx="400" cy="400" rx="28" ry="18" fill="${CREAM}"/>
        <text x="400" y="470" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${CREAM}" letter-spacing="3">PAWRA</text>
        <rect x="330" y="540" width="140" height="10" rx="5" fill="${accent}" opacity="0.85"/>
      `;
    case 'rx-bag':
      return `
        <path d="M285 200 L515 200 L540 630 L260 630 Z" fill="#EEF4F8" stroke="${FOREST}" stroke-width="3"/>
        <rect x="285" y="200" width="230" height="70" fill="${accent}"/>
        <text x="400" y="245" text-anchor="middle" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="${CREAM}">Rx</text>
        <rect x="320" y="310" width="160" height="160" rx="10" fill="${FOREST}"/>
        <text x="400" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${CREAM}">PAWRA</text>
        <text x="400" y="430" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" fill="${JADE}">VET FORMULA</text>
        <rect x="320" y="520" width="160" height="8" rx="4" fill="${accent}"/>
      `;
    case 'cans':
      return `
        <ellipse cx="330" cy="520" rx="70" ry="22" fill="${MUTED}" opacity="0.25"/>
        <rect x="270" y="340" width="120" height="180" rx="8" fill="${accent}" stroke="${FOREST}" stroke-width="2"/>
        <ellipse cx="330" cy="340" rx="60" ry="18" fill="${CREAM}" stroke="${FOREST}" stroke-width="2"/>
        <ellipse cx="470" cy="500" rx="70" ry="22" fill="${MUTED}" opacity="0.25"/>
        <rect x="410" y="300" width="120" height="200" rx="8" fill="${FOREST}" stroke="${FOREST}" stroke-width="2"/>
        <ellipse cx="470" cy="300" rx="60" ry="18" fill="${CREAM}" stroke="${FOREST}" stroke-width="2"/>
        <text x="470" y="410" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="${CREAM}">PAWRA</text>
        <circle cx="330" cy="420" r="22" fill="${JADE}"/>
      `;
    case 'tub':
      return `
        <ellipse cx="400" cy="560" rx="120" ry="30" fill="${MUTED}" opacity="0.2"/>
        <path d="M290 320 L510 320 L530 540 L270 540 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="400" cy="320" rx="110" ry="36" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="400" cy="310" rx="70" ry="20" fill="${FOREST}"/>
        <text x="400" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${FOREST}">PAWRA</text>
        <rect x="340" y="460" width="120" height="8" rx="4" fill="${accent}"/>
      `;
    case 'pouch':
      return `
        <path d="M310 240 Q400 200 490 240 L520 560 Q400 600 280 560 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <path d="M320 250 Q400 220 480 250 L490 360 Q400 340 310 360 Z" fill="${accent}"/>
        <circle cx="400" cy="430" r="40" fill="${FOREST}"/>
        <circle cx="400" cy="420" r="14" fill="${JADE}"/>
        <text x="400" y="510" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="${FOREST}">PAWRA</text>
      `;
    case 'plush':
      return `
        <ellipse cx="400" cy="420" rx="110" ry="130" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <circle cx="360" cy="360" r="18" fill="${FOREST}"/>
        <circle cx="440" cy="360" r="18" fill="${FOREST}"/>
        <ellipse cx="400" cy="430" rx="36" ry="24" fill="${FOREST}" opacity="0.35"/>
        <circle cx="330" cy="300" r="28" fill="${accent}" stroke="${FOREST}" stroke-width="2"/>
        <circle cx="470" cy="300" r="28" fill="${accent}" stroke="${FOREST}" stroke-width="2"/>
        <text x="400" y="600" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="${FOREST}">PAWRA</text>
      `;
    case 'ring':
      return `
        <circle cx="400" cy="400" r="130" fill="none" stroke="${accent}" stroke-width="48"/>
        <circle cx="400" cy="400" r="130" fill="none" stroke="${FOREST}" stroke-width="4"/>
        <circle cx="400" cy="400" r="82" fill="none" stroke="${FOREST}" stroke-width="4"/>
        <circle cx="400" cy="400" r="28" fill="${JADE}"/>
      `;
    case 'puzzle':
      return `
        <rect x="260" y="260" width="280" height="280" rx="24" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <circle cx="340" cy="340" r="36" fill="${accent}"/>
        <circle cx="460" cy="340" r="36" fill="${FOREST}"/>
        <circle cx="340" cy="460" r="36" fill="${FOREST}"/>
        <circle cx="460" cy="460" r="36" fill="${JADE}"/>
        <circle cx="400" cy="400" r="22" fill="${CORAL}"/>
      `;
    case 'balls':
      return `
        <circle cx="340" cy="430" r="70" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <path d="M290 430 Q340 390 390 430 Q340 470 290 430" fill="none" stroke="${FOREST}" stroke-width="3"/>
        <circle cx="470" cy="360" r="55" fill="${JADE}" stroke="${FOREST}" stroke-width="3"/>
        <circle cx="430" cy="500" r="45" fill="${FOREST}"/>
      `;
    case 'rope':
      return `
        <path d="M240 420 Q320 300 400 420 Q480 540 560 420" fill="none" stroke="${accent}" stroke-width="28" stroke-linecap="round"/>
        <path d="M240 420 Q320 300 400 420 Q480 540 560 420" fill="none" stroke="${FOREST}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="240" cy="420" r="34" fill="${FOREST}"/>
        <circle cx="560" cy="420" r="34" fill="${FOREST}"/>
      `;
    case 'bed':
      return `
        <ellipse cx="400" cy="480" rx="190" ry="70" fill="${MUTED}" opacity="0.2"/>
        <path d="M220 420 Q400 300 580 420 Q400 520 220 420 Z" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <path d="M260 410 Q400 340 540 410 Q400 470 260 410 Z" fill="${CREAM}" opacity="0.55"/>
        <text x="400" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${FOREST}">PAWRA</text>
      `;
    case 'donut':
      return `
        <ellipse cx="400" cy="420" rx="170" ry="150" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="400" cy="430" rx="70" ry="55" fill="${OAT}"/>
        <ellipse cx="400" cy="410" rx="150" ry="40" fill="${CREAM}" opacity="0.35"/>
      `;
    case 'pad':
      return `
        <rect x="220" y="320" width="360" height="200" rx="28" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="250" y="350" width="300" height="140" rx="18" fill="${CREAM}" opacity="0.45"/>
        <text x="400" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${FOREST}">PAWRA</text>
      `;
    case 'bottle':
      return `
        <rect x="360" y="210" width="80" height="50" rx="8" fill="${FOREST}"/>
        <rect x="345" y="255" width="110" height="30" rx="6" fill="${MUTED}"/>
        <path d="M310 290 L490 290 L510 580 L290 580 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="310" y="290" width="180" height="90" fill="${accent}"/>
        <text x="400" y="450" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${FOREST}">PAWRA</text>
        <circle cx="400" cy="520" r="18" fill="${JADE}"/>
      `;
    case 'brush':
      return `
        <rect x="250" y="360" width="220" height="90" rx="20" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        ${Array.from({length: 8}, (_, i) => `<line x1="${280 + i * 22}" y1="450" x2="${280 + i * 22}" y2="510" stroke="${FOREST}" stroke-width="4" stroke-linecap="round"/>`).join('')}
        <rect x="470" y="375" width="120" height="60" rx="16" fill="${FOREST}"/>
      `;
    case 'dropper':
      return `
        <rect x="370" y="220" width="60" height="40" rx="8" fill="${FOREST}"/>
        <path d="M355 260 L445 260 L460 560 L340 560 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="355" y="300" width="90" height="120" fill="${accent}" opacity="0.85"/>
        <text x="400" y="480" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" fill="${FOREST}">CARE</text>
      `;
    case 'kit':
      return `
        <rect x="240" y="280" width="320" height="240" rx="16" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="240" y="280" width="320" height="70" fill="${accent}"/>
        <text x="400" y="325" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="${CREAM}">PAWRA</text>
        <rect x="280" y="390" width="100" height="80" rx="8" fill="${FOREST}" opacity="0.15"/>
        <rect x="420" y="390" width="100" height="80" rx="8" fill="${FOREST}" opacity="0.15"/>
      `;
    case 'tin':
      return `
        <ellipse cx="400" cy="460" rx="130" ry="40" fill="${MUTED}" opacity="0.25"/>
        <ellipse cx="400" cy="360" rx="130" ry="40" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="270" y="360" width="260" height="100" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="400" cy="460" rx="130" ry="40" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <text x="400" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${FOREST}">PAWRA</text>
      `;
    case 'leash':
      return `
        <path d="M220 420 C300 280, 500 560, 580 400" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round"/>
        <path d="M220 420 C300 280, 500 560, 580 400" fill="none" stroke="${FOREST}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="220" cy="420" r="28" fill="none" stroke="${FOREST}" stroke-width="10"/>
        <rect x="540" y="370" width="50" height="60" rx="8" fill="${FOREST}"/>
      `;
    case 'harness':
      return `
        <ellipse cx="400" cy="380" rx="140" ry="100" fill="none" stroke="${accent}" stroke-width="28"/>
        <ellipse cx="400" cy="380" rx="140" ry="100" fill="none" stroke="${FOREST}" stroke-width="4"/>
        <path d="M320 460 L280 560 M480 460 L520 560" stroke="${accent}" stroke-width="22" stroke-linecap="round"/>
        <circle cx="400" cy="300" r="18" fill="${JADE}"/>
      `;
    case 'collar':
      return `
        <path d="M240 400 Q400 300 560 400 Q400 500 240 400" fill="none" stroke="${accent}" stroke-width="26"/>
        <path d="M240 400 Q400 300 560 400 Q400 500 240 400" fill="none" stroke="${FOREST}" stroke-width="4"/>
        <rect x="370" y="450" width="60" height="40" rx="6" fill="${FOREST}"/>
        <circle cx="400" cy="350" r="14" fill="${JADE}"/>
      `;
    case 'bowls':
      return `
        <ellipse cx="340" cy="480" rx="90" ry="30" fill="${MUTED}" opacity="0.2"/>
        <path d="M270 380 Q340 470 410 380" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="340" cy="380" rx="70" ry="18" fill="${CREAM}" stroke="${FOREST}" stroke-width="2"/>
        <ellipse cx="480" cy="500" rx="80" ry="26" fill="${MUTED}" opacity="0.2"/>
        <path d="M420 410 Q480 490 540 410" fill="${FOREST}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="480" cy="410" rx="60" ry="16" fill="${CREAM}" stroke="${FOREST}" stroke-width="2"/>
      `;
    case 'belt':
      return `
        <rect x="250" y="360" width="300" height="50" rx="12" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <circle cx="280" cy="385" r="22" fill="none" stroke="${FOREST}" stroke-width="8"/>
        <rect x="500" y="350" width="40" height="70" rx="8" fill="${FOREST}"/>
        <rect x="320" y="450" width="160" height="24" rx="8" fill="${FOREST}" opacity="0.2"/>
      `;
    case 'wand':
      return `
        <line x1="260" y1="560" x2="480" y2="260" stroke="${FOREST}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="500" cy="240" r="18" fill="${accent}"/>
        <path d="M500 240 Q560 200 540 280 Q580 260 520 300 Q560 320 490 280" fill="none" stroke="${JADE}" stroke-width="6" stroke-linecap="round"/>
        <path d="M500 240 Q440 210 470 280 Q430 250 490 300" fill="none" stroke="${CORAL}" stroke-width="5" stroke-linecap="round"/>
      `;
    case 'laser':
      return `
        <rect x="300" y="340" width="200" height="70" rx="20" fill="${FOREST}" stroke="${FOREST}" stroke-width="2"/>
        <circle cx="470" cy="375" r="18" fill="${CORAL}"/>
        <rect x="320" y="355" width="80" height="40" rx="8" fill="${accent}"/>
        <path d="M490 375 L620 300" stroke="${CORAL}" stroke-width="3" stroke-dasharray="8 6" opacity="0.7"/>
      `;
    case 'gadget':
      return `
        <circle cx="400" cy="400" r="120" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <circle cx="400" cy="400" r="70" fill="${accent}"/>
        <circle cx="400" cy="400" r="28" fill="${FOREST}"/>
        <circle cx="400" cy="400" r="10" fill="${JADE}"/>
        <rect x="370" y="250" width="60" height="40" rx="8" fill="${FOREST}"/>
      `;
    case 'tree':
      return `
        <rect x="370" y="520" width="60" height="80" fill="${accent}" stroke="${FOREST}" stroke-width="2"/>
        <ellipse cx="400" cy="500" rx="140" ry="30" fill="${FOREST}" opacity="0.15"/>
        <rect x="300" y="360" width="80" height="160" rx="8" fill="${accent}" stroke="${FOREST}" stroke-width="2"/>
        <rect x="420" y="300" width="90" height="120" rx="8" fill="${CREAM}" stroke="${FOREST}" stroke-width="2"/>
        <circle cx="360" cy="320" r="40" fill="${FOREST}"/>
        <circle cx="480" cy="270" r="36" fill="${accent}" stroke="${FOREST}" stroke-width="2"/>
      `;
    case 'perch':
      return `
        <rect x="220" y="360" width="360" height="24" rx="8" fill="${FOREST}"/>
        <path d="M260 360 L280 480 L520 480 L540 360" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="400" cy="420" rx="70" ry="28" fill="${CREAM}" opacity="0.5"/>
      `;
    case 'scratcher':
      return `
        <rect x="300" y="240" width="200" height="340" rx="16" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        ${Array.from({length: 10}, (_, i) => `<line x1="320" y1="${280 + i * 28}" x2="480" y2="${280 + i * 28}" stroke="${FOREST}" stroke-width="2" opacity="0.35"/>`).join('')}
        <rect x="280" y="560" width="240" height="30" rx="8" fill="${FOREST}"/>
      `;
    case 'litter-bag':
      return `
        <path d="M290 230 L510 230 L545 600 L255 600 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="290" y="230" width="220" height="80" fill="${accent}"/>
        <text x="400" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${CREAM}">PAWRA</text>
        <rect x="330" y="360" width="140" height="140" rx="12" fill="${FOREST}" opacity="0.12"/>
        <text x="400" y="440" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" fill="${FOREST}">LITTER</text>
      `;
    case 'litter-box':
      return `
        <path d="M240 360 L560 360 L520 540 L280 540 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <path d="M280 280 L520 280 L560 360 L240 360 Z" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="400" cy="320" rx="50" ry="28" fill="${OAT}"/>
      `;
    case 'pharma-box':
      return `
        <rect x="270" y="250" width="260" height="320" rx="12" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="270" y="250" width="260" height="90" fill="${accent}"/>
        <text x="400" y="305" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="${CREAM}">PHARMACY</text>
        <circle cx="400" cy="410" r="40" fill="${FOREST}"/>
        <text x="400" y="418" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="${JADE}">Rx</text>
        <rect x="320" y="480" width="160" height="10" rx="5" fill="${FOREST}" opacity="0.25"/>
      `;
    case 'tube':
      return `
        <rect x="360" y="220" width="80" height="50" rx="10" fill="${FOREST}"/>
        <path d="M340 270 L460 270 L490 560 L310 560 Z" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="340" y="300" width="120" height="100" fill="${accent}"/>
        <text x="400" y="480" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" fill="${FOREST}">CARE</text>
      `;
    case 'habitat':
      return `
        <rect x="240" y="280" width="320" height="260" rx="12" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <rect x="260" y="300" width="280" height="180" rx="8" fill="${OAT}"/>
        <circle cx="340" cy="390" r="36" fill="${accent}" opacity="0.7"/>
        <rect x="420" y="360" width="90" height="70" rx="8" fill="${FOREST}" opacity="0.2"/>
        <rect x="240" y="500" width="320" height="40" fill="${accent}"/>
      `;
    case 'lamp':
      return `
        <rect x="380" y="480" width="40" height="100" fill="${FOREST}"/>
        <ellipse cx="400" cy="500" rx="70" ry="18" fill="${MUTED}" opacity="0.3"/>
        <path d="M320 300 L480 300 L450 470 L350 470 Z" fill="${accent}" stroke="${FOREST}" stroke-width="3"/>
        <ellipse cx="400" cy="300" rx="80" ry="24" fill="${CORAL}" opacity="0.85"/>
        <circle cx="400" cy="260" r="16" fill="${JADE}"/>
      `;
    default:
      return `
        <rect x="280" y="260" width="240" height="280" rx="20" fill="${CREAM}" stroke="${FOREST}" stroke-width="3"/>
        <circle cx="400" cy="380" r="50" fill="${accent}"/>
        <text x="400" y="480" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${FOREST}">PAWRA</text>
      `;
  }
}

function renderSvg(handle, title, shape, accentKey) {
  const accent = ACCENTS[accentKey] || FOREST;
  const lines = wrapTitle(title);
  const titleSvg = lines
    .map(
      (line, i) =>
        `<text x="400" y="${700 + i * 28}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="600" fill="${FOREST}">${esc(line)}</text>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="${esc(title)} — PAWRA">
  <defs>
    <linearGradient id="bg-${handle}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${OAT}"/>
      <stop offset="100%" stop-color="#EDE6DA"/>
    </linearGradient>
    <radialGradient id="glow-${handle}" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${OAT}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft-${handle}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="${FOREST}" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="800" height="800" fill="url(#bg-${handle})"/>
  <rect width="800" height="800" fill="url(#glow-${handle})"/>
  <circle cx="120" cy="120" r="80" fill="${JADE}" opacity="0.08"/>
  <circle cx="700" cy="680" r="100" fill="${accent}" opacity="0.08"/>
  <g filter="url(#soft-${handle})">
    ${productArt(shape, accent)}
  </g>
  ${titleSvg}
  <text x="400" y="770" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="12" letter-spacing="4" fill="${MUTED}">PAWRA CARE</text>
</svg>
`;
}

async function main() {
  await mkdir(OUT_DIR, {recursive: true});
  const manifest = {};

  for (const [handle, title, shape, accent] of PRODUCTS) {
    const svg = renderSvg(handle, title, shape, accent);
    const file = path.join(OUT_DIR, `${handle}.svg`);
    await writeFile(file, svg, 'utf8');
    manifest[handle] = `/products/${handle}.svg`;
  }

  const mapPath = path.join(ROOT, 'app', 'data', 'productImages.js');
  const mapSource = `/**
 * @file productImages.js
 * @description Studio product image paths for the mock catalog.
 * Generated by scripts/generate-product-images.mjs — do not edit by hand.
 */

/** @type {Record<string, string>} */
export const PRODUCT_IMAGES = ${JSON.stringify(manifest, null, 2)};

/** @param {string} handle */
export function getProductImage(handle) {
  return PRODUCT_IMAGES[handle] || null;
}
`;
  await writeFile(mapPath, mapSource, 'utf8');
  console.log(`Generated ${PRODUCTS.length} product images → public/products/`);
  console.log(`Wrote image map → app/data/productImages.js`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
