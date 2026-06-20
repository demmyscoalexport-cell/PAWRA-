/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file staticPages.js
 * @description Storefront utility module: staticPages.
 * @author Pawra LLC
 * @website pawrapetshop.com
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
      <h3>1. Browse by pet</h3>
      <p>Start with Dogs or Cats — every category is organized the way you think. Filter by price, category, and more.</p>
      <h3>2. Add to cart & checkout securely</h3>
      <p>Checkout is powered by Shopify with Shopify Payments, Apple Pay, Google Pay, Shop Pay, and PayPal. Your payment info is never stored on our servers.</p>
      <h3>3. Delivered to your door</h3>
      <p>Most orders arrive within 3–5 business days anywhere in the United States. Free shipping on orders over $75.</p>
      <h3>Subscribe &amp; Save</h3>
      <p>Set up recurring deliveries on essentials and save 10% every order. <a href="/pages/subscribe-and-save">Learn more</a>.</p>
      <p>Need help? Contact <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a>.</p>
    `,
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with the PAWRA team.',
    body: `
      <p><strong>${BRAND.name}</strong><br/>
      ${BRAND.address.line1}<br/>
      ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.zip}<br/>
      ${BRAND.address.country}</p>
      <p>Email: <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a><br/>
      Website: <a href="${BRAND.url}">${BRAND.domain}</a></p>
    `,
  },
  'subscribe-and-save': {
    title: 'Subscribe & Save',
    description: 'Never run out of what your pet loves — save on every recurring delivery.',
    body: `
      <h3>PAWRA Subscribe &amp; Save</h3>
      <p>Set up automatic deliveries on treats, food, grooming supplies, and everyday essentials. Change, skip, or cancel anytime — no commitments.</p>
      <h3>How it works</h3>
      <ol>
        <li><strong>Shop</strong> — Add eligible products to cart and choose Subscribe &amp; Save at checkout.</li>
        <li><strong>Schedule</strong> — Pick your delivery frequency (every 2, 4, 6, or 8 weeks).</li>
        <li><strong>Save</strong> — Get 10% off every recurring order, plus free shipping on subscriptions over $75.</li>
      </ol>
      <h3>Why subscribe?</h3>
      <ul>
        <li>Never run out of favorites</li>
        <li>10% off every recurring delivery</li>
        <li>Skip or pause anytime from your account</li>
        <li>Exclusive early access to new PAWRA products</li>
      </ul>
      <p>Ready to start? <a href="/collections/all">Browse all products</a> or email <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a> for help setting up your first subscription.</p>
      <p><em>Subscribe &amp; Save is powered by Shopify Subscriptions. Enable in Shopify Admin → Settings → Apps and sales channels → Subscriptions.</em></p>
    `,
  },
};

export function getStaticPage(handle) {
  return STATIC_PAGES[handle] ?? null;
}
