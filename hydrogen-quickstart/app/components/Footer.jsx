/**
 * @file Footer.jsx
 * @description Site-wide footer with shop links, loyalty CTA, and newsletter.
 */

import {NavLink, useRouteLoaderData} from 'react-router';
import {JudgemeAllReviewsCount, JudgemeAllReviewsRating} from '@judgeme/shopify-hydrogen';
import {PawraLogo} from '~/components/ui/PawraLogo';
import {SocialLinks} from '~/components/SocialLinks';
import {FooterNewsletter} from '~/components/FooterNewsletter';
import {BRAND} from '~/lib/branding';
import {TAXONOMY_ROOTS, taxonomyCollectionPath} from '~/data/collections';
import {openGorgiasChat} from '~/lib/gorgias';

const SHOP_LINKS = [
  ...TAXONOMY_ROOTS.filter((root) => root.handle !== 'shop-all').map((root) => ({
    label: root.title,
    to: taxonomyCollectionPath([root.handle]),
  })),
  {label: 'Shop All', to: '/collections'},
  {label: 'All Products', to: '/collections/all'},
];

const COMPANY_LINKS = [
  {label: 'About', to: '/pages/about'},
  {label: 'How It Works', to: '/pages/how-it-works'},
  {label: 'Pharmacy', to: '/pharmacy'},
  {label: 'Telehealth', to: '/telehealth'},
  {label: 'Breed Guides', to: '/breeds'},
  {label: 'Reviews', to: '/pages/reviews'},
  {label: 'Walker Program', to: '/pages/walker-program'},
  {label: 'Subscribe & Save', to: '/pages/subscribe-and-save'},
  {label: 'Blog', to: '/blog'},
  {label: 'Contact', to: '/pages/contact'},
];

/** @param {{ loopReturnsUrl?: string }} props */
function SupportLinks({loopReturnsUrl}) {
  const links = [
    {label: 'Track Order', to: '/track-order'},
    {label: 'Contact', to: '/pages/contact'},
    {label: 'Returns Portal', to: '/returns'},
    {label: 'Returns Policy', to: loopReturnsUrl || '/policies/refund-policy', external: Boolean(loopReturnsUrl)},
    {label: 'Shipping', to: '/policies/shipping-policy'},
    {label: 'Prescription Policy', to: '/pages/prescription-policy'},
    {label: 'Autoship Terms', to: '/pages/autoship-terms'},
    {label: 'FAQ', to: '/#faq'},
  ];

  return (
    <div>
      <p className="mb-4 font-sans text-body-s font-semibold uppercase tracking-wide text-text-inverse">
        Support
      </p>
      <ul className="space-y-2">
        <li>
          <button
            type="button"
            className="reset font-sans text-body-s text-action-primary transition-colors hover:text-text-inverse"
            onClick={() => {
              void openGorgiasChat();
            }}
          >
            Live Chat
          </button>
        </li>
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-body-s text-text-inverse/70 no-underline transition-colors hover:text-text-inverse"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                to={link.to}
                className="font-sans text-body-s text-text-inverse/70 no-underline transition-colors hover:text-text-inverse"
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
      <p className="mb-4 font-sans text-body-s font-semibold uppercase tracking-wide text-text-inverse">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className="font-sans text-body-s text-text-inverse/70 no-underline transition-colors hover:text-text-inverse"
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
  const klaviyoFormId = rootData?.integrations?.klaviyo?.formId;
  const rewardsUrl = rootData?.integrations?.smile?.rewardsUrl || '/pages/rewards';
  const loopReturnsUrl = rootData?.integrations?.loopReturns?.returnsUrl;
  const judgeMeEnabled = Boolean(rootData?.judgeme || rootData?.integrations?.judgeMe);

  return (
    <footer className="border-t border-border-strong bg-inverse text-text-inverse">
      <div className="mx-auto max-w-1440 px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <PawraLogo variant="light" height={36} />
            <p className="mt-4 font-serif text-body-l italic text-text-inverse">
              {BRAND.tagline}
            </p>
            {judgeMeEnabled ? (
              <NavLink
                to="/pages/reviews"
                className="mt-3 inline-flex items-center gap-2 font-sans text-body-s text-text-inverse/70 no-underline hover:text-text-inverse"
              >
                <JudgemeAllReviewsRating />
                <span>
                  <JudgemeAllReviewsCount /> reviews
                </span>
              </NavLink>
            ) : null}
            <p className="mt-2 font-sans text-body-s text-text-inverse/70">
              {BRAND.address.line1}, {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
            </p>
            <p className="mt-1 font-sans text-body-s text-text-inverse/70">
              <a href={`mailto:${BRAND.supportEmail}`} className="text-text-inverse/70 no-underline hover:text-text-inverse">
                {BRAND.supportEmail}
              </a>
            </p>
            <SocialLinks variant="footer" className="mt-6" />
            <FooterNewsletter companyId={klaviyoId} formId={klaviyoFormId} />
            <NavLink
              to={rewardsUrl}
              className="mt-6 inline-flex items-center rounded-md border border-action-primary/40 bg-action-primary/10 px-4 py-2 font-sans text-body-s font-semibold text-action-primary no-underline transition-colors hover:bg-focus-ring/20"
            >
              Join PAWRA Rewards →
            </NavLink>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <SupportLinks loopReturnsUrl={loopReturnsUrl} />
        </div>

        <div className="mt-12 border-t border-border-subtle pt-8">
          <p className="text-center font-mono text-[12px] text-text-inverse/40">
            {BRAND.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
