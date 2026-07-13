/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file Footer.jsx
 * @description Shared component: Footer.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {NavLink} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {Icon} from '~/components/ui/Icon';
import {BRAND} from '~/lib/branding';

// ─── Footer Link Groups ───────────────────────────────────────────────────────

/** Shop category shortcuts — update handles when Shopify collections are finalized. */
const SHOP_LINKS = [
  {label: 'All Products', to: '/collections/all'},
  {label: 'Dog Products', to: '/collections/hydrogen'},
  {label: 'Cat Products', to: '/collections/automated-collection'},
  {label: 'Food & Treats', to: '/collections/frontpage'},
  {label: 'Grooming', to: '/collections/all'},
];

/** Company and content pages. */
const COMPANY_LINKS = [
  {label: 'About', to: '/pages/about'},
  {label: 'How It Works', to: '/pages/how-it-works'},
  {label: 'Blog', to: '/blog'},
  {label: 'Contact', to: '/pages/contact'},
];

/** Customer support and policy links. */
const SUPPORT_LINKS = [
  {label: 'Track Order', to: '/account/orders'},
  {label: 'Contact', to: '/pages/contact'},
  {label: 'Returns', to: '/policies/refund-policy'},
  {label: 'FAQ', to: '/#faq'},
  {label: 'Shipping', to: '/policies/shipping-policy'},
];

/** External social profiles for PAWRA Pet Shop. */
const SOCIAL = [
  {label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/pawrapercares'},
  {label: 'TikTok', icon: 'tiktok', href: 'https://tiktok.com/@pawrapercares'},
  {label: 'Facebook', icon: 'facebook', href: 'https://facebook.com/pawrapercares'},
  {label: 'Pinterest', icon: 'pinterest', href: 'https://pinterest.com/pawrapercares'},
];

// ─── Footer Column Helper ─────────────────────────────────────────────────────

/**
 * Renders a titled column of NavLink items.
 * @param {{title: string; links: Array<{label: string; to: string}>}} props
 */
function FooterColumn({title, links}) {
  return (
    <div>
      <p className="mb-4 font-sans text-body-s font-semibold uppercase tracking-wide text-cloud">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className="font-sans text-body-s text-cloud/70 no-underline transition-colors hover:text-cloud"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Footer Component ─────────────────────────────────────────────────────────

/**
 * Site-wide footer — brand block, link columns, social icons, and copyright.
 * TODO: Add loyalty program CTA (e.g. "Join PAWRA Rewards") when program launches.
 */
export function Footer() {
  return (
    <footer className="border-t border-electric-jade bg-forest-night text-cloud">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* ─── Brand Block ─── */}
          <div className="lg:col-span-2">
            <Logo variant="light" height={36} />
            <p className="mt-4 font-serif text-body-l italic text-cloud">
              {BRAND.tagline}
            </p>
            <p className="mt-2 font-sans text-body-s text-cloud/60">
              {BRAND.address.line1}, {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
            </p>
            <p className="mt-1 font-sans text-body-s text-cloud/60">
              <a href={`mailto:${BRAND.supportEmail}`} className="text-cloud/70 no-underline hover:text-cloud">
                {BRAND.supportEmail}
              </a>
            </p>
            {/* ─── Social Links ─── */}
            <div className="mt-6 flex gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-cloud/70 transition-colors hover:text-cloud"
                >
                  <Icon name={s.icon} size="md" color="text-cloud" />
                </a>
              ))}
            </div>
          </div>

          {/* ─── Link Columns ─── */}
          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Support" links={SUPPORT_LINKS} />
        </div>

        {/* ─── Copyright ─── */}
        <div className="mt-12 border-t border-cloud/10 pt-8">
          <p className="text-center font-mono text-[12px] text-cloud/40">
            {BRAND.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
