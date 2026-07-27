/**
 * @file GuaranteeBand.jsx
 * @description 30-day Pet Guarantee proof band for first-time buyers.
 */

import {Link} from 'react-router';
import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';
import {PET_GUARANTEE} from '~/data/starterKits';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';

export function GuaranteeBand() {
  return (
    <SectionReveal>
      <section className="bg-header px-4 py-12 text-action-primary-label md:px-10 md:py-16">
        <div className="mx-auto grid max-w-1440 gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="font-sans text-body-xs font-semibold uppercase tracking-widest text-electric-jade">
              Risk-free first order
            </p>
            <h2 className="mt-3 font-serif text-display-s text-white md:text-heading-l">
              {PET_GUARANTEE.title}
            </h2>
            <p className="mt-4 max-w-xl font-sans text-body-m text-white/80">
              {PET_GUARANTEE.detail}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/returns"
                className="font-sans text-body-s font-semibold text-white no-underline underline-offset-4 hover:underline"
              >
                Start a return →
              </Link>
              <Link
                to="/policies/refund-policy"
                className="font-sans text-body-s text-white/75 no-underline hover:text-white"
              >
                Refund policy
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            <ProofChip icon="truck" label={`Free shipping over $${FREE_SHIPPING_THRESHOLD_USD}`} />
            <ProofChip icon="shield" label="Secure Shopify checkout" />
            <ProofChip icon="check" label="30-day easy returns" />
            <ProofChip icon="heart" label="Curated for real pet care" />
          </ul>
        </div>
      </section>
    </SectionReveal>
  );
}

/** @param {{ icon: string; label: string }} props */
function ProofChip({icon, label}) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-white/15 bg-white/5 px-4 py-3">
      <Icon name={icon} size="sm" color="text-electric-jade" />
      <span className="font-sans text-body-s text-white">{label}</span>
    </li>
  );
}
