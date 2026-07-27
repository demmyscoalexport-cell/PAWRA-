/**
 * @file TrustBar.jsx
 * @description Proof strip — shipping, guarantee, curation, care.
 */

import {Link} from 'react-router';
import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';
import {PET_GUARANTEE} from '~/data/starterKits';

const ITEMS = [
  {
    icon: 'truck',
    label: `Free shipping over $${FREE_SHIPPING_THRESHOLD_USD}`,
    to: '/policies/shipping-policy',
  },
  {
    icon: 'check',
    label: PET_GUARANTEE.short,
    to: '/returns',
  },
  {
    icon: 'shield',
    label: 'Secure Shopify checkout',
    to: '/cart',
  },
  {
    icon: 'heart',
    label: 'Curated for real pet care',
    to: '/care/quiz',
  },
];

export function TrustBar() {
  return (
    <SectionReveal>
      <section className="border-y border-border-subtle bg-page-bg px-4 py-12 md:px-10">
        <div className="mx-auto grid max-w-1440 grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center text-center no-underline md:items-start md:text-left"
            >
              <Icon name={item.icon} size="md" color="text-action-primary" />
              <p className="mt-3 font-sans text-body-s font-medium text-text-primary">{item.label}</p>
            </Link>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
