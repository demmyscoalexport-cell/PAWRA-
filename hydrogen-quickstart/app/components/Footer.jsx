/**
 * @file Footer.jsx
 * @description Site-wide footer with shop links, loyalty CTA, and newsletter.
 */

import {NavLink, useRouteLoaderData} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {SocialLinks} from '~/components/SocialLinks';
import {FooterNewsletter} from '~/components/FooterNewsletter';
import {BRAND} from '~/lib/branding';
import {PAWRA_COLLECTIONS} from '~/lib/pawraCollections';

const SHOP_LINKS = PAWRA_COLLECTIONS.filter((c) => c.handle !== 'frontpage').map((c) => ({
  label: c.title,
  to: c.path,
}));

const COMPANY_LINKS = [
  {label: 'About', to: '/pages/about'},
  {label: 'How It Works', to: '/pages/how-it-works'},
  {label: 'Walker Program', to: '/pages/walker-program'},
  {label: 'Subscribe & Save', to: '/pages/subscribe-and-save'},
  {label: 'Blog', to: '/blog'},
  {label: 'Contact', to: '/pages/contact'},
];

/** @param {{ loopReturnsUrl?: string }} props */
function SupportLinks({loopReturnsUrl}) {
  const links = [
    {label: 'Track Order', to: '/account/orders'},
    {label: 'Contact', to: '/pages/contact'},
    {label: 'Returns', to: loopReturnsUrl || '/policies/refund-policy', external: Boolean(loopReturnsUrl)},
    {label: 'FAQ', to: '/#faq'},
    {label: 'Shipping', to: '/policies/shipping-policy'},
  ];

  return (
    <div>
      <p className="mb-4 font-sans text-body-s font-semibold uppercase tracking-wide text-cloud">
        Support
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-body-s text-cloud/70 no-underline transition-colors hover:text-cloud"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                to={link.to}
                className="font-sans text-body-s text-cloud/70 no-underline transition-colors hover:text-cloud"
              >
                {link.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
  /** @type {{ integrations?: { klaviyo?: { companyId?: string }; smile?: { rewardsUrl?: string }; loopReturns?: { returnsUrl?: string } } } | undefined} */
  const rootData = useRouteLoaderData('root');
  const klaviyoId = rootData?.integrations?.klaviyo?.companyId;
  const rewardsUrl = rootData?.integrations?.smile?.rewardsUrl || '/pages/rewards';
  const loopReturnsUrl = rootData?.integrations?.loopReturns?.returnsUrl;

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
            <FooterNewsletter companyId={klaviyoId} />
            <NavLink
              to={rewardsUrl}
              className="mt-6 inline-flex items-center rounded-md border border-electric-jade/40 bg-electric-jade/10 px-4 py-2 font-sans text-body-s font-semibold text-electric-jade no-underline transition-colors hover:bg-electric-jade/20"
            >
              Join PAWRA Rewards →
            </NavLink>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <SupportLinks loopReturnsUrl={loopReturnsUrl} />
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
