/**
 * @file Footer.jsx
 * @description Minimal light footer with shop links and newsletter.
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
];

const COMPANY_LINKS = [
  {label: 'About', to: '/pages/about'},
  {label: 'Pharmacy', to: '/pharmacy'},
  {label: 'Telehealth', to: '/telehealth'},
  {label: 'Breed Guides', to: '/breeds'},
  {label: 'Journal', to: '/blog'},
  {label: 'Contact', to: '/pages/contact'},
];

/** @param {{ loopReturnsUrl?: string }} props */
function SupportLinks({loopReturnsUrl}) {
  const links = [
    {label: 'Track Order', to: '/track-order'},
    {label: 'Returns', to: '/returns'},
    {label: 'Shipping', to: '/policies/shipping-policy'},
    {label: 'Prescription Policy', to: '/pages/prescription-policy'},
    {label: 'FAQ', to: '/#faq'},
  ];

  return (
    <div>
      <p className="mb-4 font-sans text-body-xs font-medium uppercase tracking-wide text-footer-fg">
        Support
      </p>
      <ul className="space-y-2">
        <li>
          <button
            type="button"
            className="reset font-sans text-body-s text-footer-fg/75 transition-colors hover:text-footer-fg"
            onClick={() => {
              void openGorgiasChat();
            }}
          >
            Live Chat
          </button>
        </li>
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className="font-sans text-body-s text-footer-fg/75 no-underline transition-colors hover:text-footer-fg"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        {loopReturnsUrl ? (
          <li>
            <a
              href={loopReturnsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-body-s text-footer-fg/75 no-underline transition-colors hover:text-footer-fg"
            >
              Returns portal
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

/**
 * @param {{title: string; links: Array<{label: string; to: string}>}} props
 */
function FooterColumn({title, links}) {
  return (
    <div>
      <p className="mb-4 font-sans text-body-xs font-medium uppercase tracking-wide text-footer-fg">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className="font-sans text-body-s text-footer-fg/75 no-underline transition-colors hover:text-footer-fg"
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
  /** @type {{ integrations?: { klaviyo?: { companyId?: string; formId?: string }; smile?: { rewardsUrl?: string }; loopReturns?: { returnsUrl?: string } } ; judgeme?: unknown } | undefined} */
  const rootData = useRouteLoaderData('root');
  const klaviyoId = rootData?.integrations?.klaviyo?.companyId;
  const klaviyoFormId = rootData?.integrations?.klaviyo?.formId;
  const rewardsUrl = rootData?.integrations?.smile?.rewardsUrl || '/pages/rewards';
  const loopReturnsUrl = rootData?.integrations?.loopReturns?.returnsUrl;
  const judgeMeEnabled = Boolean(rootData?.judgeme || rootData?.integrations?.judgeMe);

  return (
    <footer className="border-t border-border-subtle bg-footer text-footer-fg">
      <div className="mx-auto max-w-1440 px-4 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="text-footer-fg">
              <PawraLogo variant="light" height={28} />
            </div>
            <p className="mt-4 max-w-xs font-sans text-body-s text-footer-fg/75">
              {BRAND.tagline}
            </p>
            {judgeMeEnabled ? (
              <NavLink
                to="/pages/reviews"
                className="mt-3 inline-flex items-center gap-2 font-sans text-body-s text-footer-fg/75 no-underline hover:text-footer-fg"
              >
                <JudgemeAllReviewsRating />
                <span>
                  <JudgemeAllReviewsCount /> reviews
                </span>
              </NavLink>
            ) : null}
            <SocialLinks variant="footer" className="mt-6" />
            <FooterNewsletter companyId={klaviyoId} formId={klaviyoFormId} />
            <NavLink
              to={rewardsUrl}
              className="mt-6 inline-flex font-sans text-body-s font-medium text-footer-fg no-underline underline-offset-4 hover:underline"
            >
              PAWRA Rewards
            </NavLink>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <SupportLinks loopReturnsUrl={loopReturnsUrl} />
        </div>

        <div className="mt-16 border-t border-footer-fg/15 pt-8">
          <nav
            className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-body-xs text-footer-fg/70"
            aria-label="Legal"
          >
            <NavLink to="/policies/privacy-policy" className="no-underline hover:text-footer-fg">
              Privacy
            </NavLink>
            <NavLink to="/policies/refund-policy" className="no-underline hover:text-footer-fg">
              Refunds
            </NavLink>
            <NavLink to="/policies/shipping-policy" className="no-underline hover:text-footer-fg">
              Shipping
            </NavLink>
            <NavLink to="/policies/terms-of-service" className="no-underline hover:text-footer-fg">
              Terms
            </NavLink>
            <NavLink to="/returns" className="no-underline hover:text-footer-fg">
              Returns
            </NavLink>
            <NavLink to="/track-order" className="no-underline hover:text-footer-fg">
              Track order
            </NavLink>
          </nav>
          <p className="text-center font-mono text-[12px] text-footer-fg/60">
            {BRAND.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
