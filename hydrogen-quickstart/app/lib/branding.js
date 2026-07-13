/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapercares.com             ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file branding.js
 * @description Storefront utility module: branding.
 * @author Pawra LLC
 * @website pawrapercares.com
 */

/**
 * PAWRA Pet Shop brand constants — pawrapercares.com
 * Single source of truth for site-wide copy, contact info, and legal footer text.
 */

// ─── Brand Identity ─────────────────────────────────────────────────────────────

/** Core brand metadata used in meta tags, footer, and about pages. */
export const BRAND = {
  name: 'PAWRA',
  tagline: 'Every moment. Every pet. Every life.',
  domain: 'pawrapercares.com',
  url: 'https://pawrapercares.com',
  supportEmail: 'support@pawrapercares.com',
  address: {
    line1: '256 Chapman Road',
    city: 'Presque Isle',
    state: 'ME',
    zip: '04769',
    country: 'United States',
  },
  copyright: '© 2026 PAWRA LLC · Presque Isle, ME · pawrapercares.com',
};

// ─── About Page Copy ────────────────────────────────────────────────────────────

/** Pre-rendered HTML body for the About page (`/pages/about`). */
export const ABOUT_COPY = {
  title: 'About PAWRA',
  description: BRAND.tagline,
  body: `
    <p>Pawra was founded with one mission: give every pet owner access to premium products for their cats and dogs. We curate the best pet food, beds, toys, grooming supplies, collars, and wellness products — all delivered to your door.</p>
    <p><strong>${BRAND.tagline}</strong></p>
    <p>Questions? Email us at <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a>.</p>
  `,
};
