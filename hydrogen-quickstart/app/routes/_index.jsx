/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file _index.jsx
 * @description Route module: _index — Pawra Pet Shop page or API handler.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {
  HeroSection,
  TrustBar,
  HeroProductSpotlight,
  CompleteYourSetup,
  WhyPawra,
  Ecosystem,
  FrequentlyBoughtTogether,
  Testimonials,
  FAQ,
} from '~/components/sections';
import {BRAND} from '~/lib/branding';

// ─── SEO Meta ─────────────────────────────────────────────────────────────────

/**
 * Homepage meta tags for PAWRA landing page.
 * @returns {Array<import('react-router').MetaDescriptor>}
 */
export const meta = () => {
  return [
    {title: `PAWRA — ${BRAND.tagline} | ${BRAND.domain}`},
    {
      name: 'description',
      content:
        'Premium pet food, beds, toys, grooming supplies, collars, and wellness products for cats and dogs — delivered to your door.',
    },
  ];
};

// ─── Loader ───────────────────────────────────────────────────────────────────

/**
 * Homepage loader — section components fetch their own data where needed.
 * @returns {Promise<Record<string, never>>}
 */
export async function loader() {
  return {};
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

/**
 * PAWRA homepage — stacked marketing sections from hero through FAQ.
 * Each section is a self-contained component in `~/components/sections`.
 */
export default function Homepage() {
  return (
    <div className="home">
      {/* ─── Hero & Trust ─── */}
      <HeroSection />
      <TrustBar />

      {/* ─── Product Discovery ─── */}
      <HeroProductSpotlight />
      <CompleteYourSetup />

      {/* ─── Brand Story ─── */}
      <WhyPawra />
      <Ecosystem />

      {/* ─── Social Proof ─── */}
      {/* TODO: Replace static Testimonials with reviews API or Shopify metafields */}
      <FrequentlyBoughtTogether />
      <Testimonials />

      {/* ─── FAQ Anchor ─── */}
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}

/** @typedef {import('./+types/_index').Route} Route */
