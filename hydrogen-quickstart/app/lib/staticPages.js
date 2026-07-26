/**
 * @file staticPages.js
 * @description Static marketing pages served at /pages/:handle.
 */

import {ABOUT_COPY, BRAND} from '~/lib/branding';

/** @type {Record<string, {title: string; description: string; body: string}>} */
export const STATIC_PAGES = {
  about: {
    title: ABOUT_COPY.title,
    description: ABOUT_COPY.description,
    body: ABOUT_COPY.body,
  },
  'how-it-works': {
    title: 'How It Works',
    description: 'Shop premium pet products for cats and dogs in three simple steps.',
    body: `
      <h3>1. Browse our catalog</h3>
      <p>Explore food, beds, toys, grooming, collars, and wellness products curated for cats and dogs.</p>
      <h3>2. Add to cart & checkout</h3>
      <p>Secure checkout powered by Shopify. Free shipping on orders over $75.</p>
      <h3>3. Delivered to your door</h3>
      <p>Most orders arrive within 3–5 business days anywhere in the United States.</p>
      <p>Need help? Use live chat on the site, or email <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a>.</p>
    `,
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with the PAWRA team — live chat or email.',
    body: `
      <p>Questions about products, shipping, orders, or the Walker Program? Start with live chat for the fastest answer, or email us anytime.</p>
      <p><strong>${BRAND.name}</strong><br/>
      ${BRAND.address.line1}<br/>
      ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.zip}<br/>
      ${BRAND.address.country}</p>
      <p>Email: <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a><br/>
      Website: <a href="${BRAND.url}">${BRAND.domain}</a></p>
      <p>We typically reply to email within one business day.</p>
    `,
  },
  'subscribe-and-save': {
    title: 'Subscribe & Save',
    description: 'Autoship essentials and save on repeat orders for your pets.',
    body: `
      <h3>Never run out of essentials</h3>
      <p>Set up autoship for food, treats, litter, and wellness products your pets use every week.</p>
      <h3>How it works</h3>
      <ol>
        <li>Add eligible products to cart and choose a delivery frequency at checkout.</li>
        <li>Save on every recurring order — typical savings are 5–10% off retail.</li>
        <li>Skip, pause, or cancel anytime from your account or by contacting support.</li>
      </ol>
      <h3>Get started</h3>
      <p>Browse <a href="/collections/food-treats">Food & Treats</a> or <a href="/collections/all">shop all products</a> to find subscribe-eligible items.</p>
      <p>Questions? Email <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a>.</p>
    `,
  },
  'size-guide': {
    title: 'Size Guide',
    description: 'Find the right fit for beds, collars, and apparel for cats and dogs.',
    body: `
      <h3>Dog beds</h3>
      <table>
        <tr><th>Size</th><th>Weight range</th><th>Bed dimensions</th></tr>
        <tr><td>Small</td><td>Up to 25 lb</td><td>24" × 18"</td></tr>
        <tr><td>Medium</td><td>25–50 lb</td><td>32" × 24"</td></tr>
        <tr><td>Large</td><td>50–90 lb</td><td>40" × 30"</td></tr>
        <tr><td>X-Large</td><td>90+ lb</td><td>48" × 36"</td></tr>
      </table>
      <h3>Cat beds</h3>
      <table>
        <tr><th>Size</th><th>Best for</th><th>Bed dimensions</th></tr>
        <tr><td>Standard</td><td>Most adult cats</td><td>18" × 14"</td></tr>
        <tr><td>Large</td><td>Large breeds / multi-cat</td><td>22" × 18"</td></tr>
      </table>
      <h3>Collars</h3>
      <p>Measure your pet's neck at the base and add 1–2 inches for comfort. When in doubt, size up.</p>
      <p>Need help choosing? <a href="/pages/contact">Contact our team</a>.</p>
    `,
  },
  rewards: {
    title: 'PAWRA Rewards',
    description: 'Earn points on every order and unlock member-only perks.',
    body: `
      <h3>Join PAWRA Rewards</h3>
      <p>Earn points on purchases, referrals, and reviews. Redeem for discounts on future orders for your pets.</p>
      <h3>How to join</h3>
      <ol>
        <li><a href="/account/login">Sign in</a> or create your PAWRA account.</li>
        <li>Shop as usual — points accrue on eligible orders.</li>
        <li>Redeem rewards toward future purchases from your account or the rewards panel.</li>
      </ol>
      <p>Questions? Email <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a> or use live chat.</p>
    `,
  },
  wishlist: {
    title: 'My Wishlist',
    description: 'Saved products for later.',
    body: `
      <p>Save products you love and come back when you’re ready to order.</p>
      <p>Browse the catalog and tap the heart on items you want to keep handy for your next shop.</p>
      <p><a href="/collections/all">Continue shopping</a> · <a href="/account/login">Sign in</a> to keep your list across devices.</p>
    `,
  },
};

export function getStaticPage(handle) {
  return STATIC_PAGES[handle] ?? null;
}
