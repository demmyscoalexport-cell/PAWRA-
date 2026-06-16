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
      <h3>1. Browse our catalog</h3>
      <p>Explore food, beds, toys, grooming, collars, and wellness products curated for cats and dogs.</p>
      <h3>2. Add to cart & checkout</h3>
      <p>Secure checkout powered by Shopify. Free shipping on orders over $75.</p>
      <h3>3. Delivered to your door</h3>
      <p>Most orders arrive within 3–5 business days anywhere in the United States.</p>
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
};

export function getStaticPage(handle) {
  return STATIC_PAGES[handle] ?? null;
}
