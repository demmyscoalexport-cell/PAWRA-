/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file MockShopNotice.jsx
 * @description Shared component: MockShopNotice.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {BRAND} from '~/lib/branding';

export function MockShopNotice() {
  return (
    <section
      className="mock-shop-notice"
      aria-labelledby="mock-shop-notice-heading"
    >
      <div className="inner">
        <h2 id="mock-shop-notice-heading" className="font-serif text-forest-green">
          PAWRA — {BRAND.tagline}
        </h2>
        <p>
          You&rsquo;re browsing a demo catalog at{' '}
          <strong>{BRAND.domain}</strong> with sample products while your Shopify
          store is being connected.
        </p>
        <p>
          Link your store by running <code>npx shopify hydrogen link</code> in
          the <code>hydrogen-quickstart</code> folder.
        </p>
      </div>
    </section>
  );
}
