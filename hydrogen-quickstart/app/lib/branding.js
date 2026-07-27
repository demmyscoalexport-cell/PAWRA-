/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file branding.js
 * @description Storefront utility module: branding.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

/**
 * PAWRA Pet Shop brand constants — pawrapetshop.com
 * Single source of truth for site-wide copy, contact info, and legal footer text.
 */

// ─── Brand Identity ─────────────────────────────────────────────────────────────

/** Core brand metadata used in meta tags, footer, and about pages. */
export const BRAND = {
  name: 'PAWRA PET SHOP',
  shortName: 'PAWRA',
  tagline: 'Premium Pets Products Store',
  domain: 'pawrapetshop.com',
  url: 'https://pawrapetshop.com',
  supportEmail: 'support@pawrapetshop.com',
  address: {
    line1: '76 Main St',
    city: 'Sparrow Bush',
    state: 'NY',
    zip: '12780',
    country: 'United States',
  },
  copyright: '© 2025 Pawra LLC · Sparrow Bush, NY · pawrapetshop.com',
};

/** Official PAWRA social profiles — used in footer and contact page. */
export const SOCIAL_LINKS = [
  {platform: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/pawrapetshop'},
  {platform: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@pawrapetshop'},
  {platform: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/pawrapetshop'},
  {platform: 'pinterest', label: 'Pinterest', href: 'https://www.pinterest.com/pawrapetshop'},
];

// ─── About Page Copy ────────────────────────────────────────────────────────────

/** Pre-rendered HTML body for the About page (`/pages/about`). */
export const ABOUT_COPY = {
  title: 'About PAWRA PET SHOP',
  description: BRAND.tagline,
  body: `
    <p>PAWRA Pet Shop was founded with one mission: give every pet owner access to premium products for their cats and dogs. We curate the best pet food, beds, toys, grooming supplies, collars, and wellness products — all delivered to your door.</p>
    <p><strong>${BRAND.tagline}</strong></p>
    <p>Questions? Email us at <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a>.</p>
  `,
};
