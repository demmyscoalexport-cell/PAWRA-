/**
 * @file Footer.jsx
 * @description Shared component: Footer.
 */

import {NavLink} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {SocialLinks} from '~/components/SocialLinks';
import {BRAND} from '~/lib/branding';

const SHOP_LINKS = [
  {label: 'All Products', to: '/collections/all'},
  {label: 'Dog Products', to: '/collections/dogs'},
  {label: 'Cat Products', to: '/collections/cats'},
  {label: 'Featured', to: '/collections/frontpage'},
];

const COMPANY_LINKS = [
  {label: 'About', to: '/pages/about'},
  {label: 'How It Works', to: '/pages/how-it-works'},
  {label: 'Blog', to: '/blog'},
  {label: 'Contact', to: '/pages/contact'},
];

const SUPPORT_LINKS = [
  {label: 'Track Order', to: '/account/orders'},
  {label: 'Contact', to: '/pages/contact'},
  {label: 'Returns', to: '/policies/refund-policy'},
  {label: 'FAQ', to: '/#faq'},
  {label: 'Shipping', to: '/policies/shipping-policy'},
];

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

export function Footer() {
  return (
    <footer className="border-t border-electric-jade bg-forest-night text-cloud">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
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
            <SocialLinks variant="footer" className="mt-6" />
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Support" links={SUPPORT_LINKS} />
        </div>

        <div className="mt-12 border-t border-cloud/10 pt-8">
          <p className="text-center font-mono text-[12px] text-cloud/40">
            {BRAND.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
