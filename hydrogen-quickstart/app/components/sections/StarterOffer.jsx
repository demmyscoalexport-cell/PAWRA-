/**
 * @file StarterOffer.jsx
 * @description Homepage first-purchase offer — starter kits + guarantee.
 */

import {Link} from 'react-router';
import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {STARTER_KITS, PET_GUARANTEE} from '~/data/starterKits';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';

export function StarterOffer() {
  const featured = STARTER_KITS.slice(0, 2);

  return (
    <SectionReveal>
      <section className="bg-surface px-4 py-16 md:px-10 md:py-24" aria-labelledby="starter-offer-heading">
        <div className="mx-auto max-w-1440">
          <div className="max-w-2xl">
            <p className="font-sans text-body-xs font-semibold uppercase tracking-widest text-action-primary">
              First order offer
            </p>
            <h2 id="starter-offer-heading" className="mt-3 font-serif text-display-s text-action-primary md:text-display-m">
              Start simple. Shop with confidence.
            </h2>
            <p className="mt-4 font-sans text-body-l text-text-secondary">
              Curated starter kits for new pet parents — plus our {PET_GUARANTEE.title.toLowerCase()}. Free US shipping over $
              {FREE_SHIPPING_THRESHOLD_USD}.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((kit) => (
              <Link
                key={kit.handle}
                to={`/bundles/${kit.handle}`}
                className="group overflow-hidden rounded-lg border border-border-subtle bg-page-bg no-underline transition-shadow hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={kit.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6">
                  <p className="font-sans text-body-xs uppercase tracking-wide text-text-secondary">
                    {kit.species === 'dog' ? 'Dogs' : 'Cats'}
                  </p>
                  <h3 className="mt-2 font-sans text-heading-s text-text-primary">{kit.title}</h3>
                  <p className="mt-2 font-sans text-body-s text-text-secondary">{kit.headline}</p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-mono-m font-semibold text-action-primary">
                      ${kit.bundlePrice}
                    </span>
                    <span className="font-mono text-mono-s text-text-secondary line-through">
                      ${kit.compareAtPrice}
                    </span>
                    <span className="font-sans text-body-xs text-sale">{kit.savingsLabel}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" href="/care/quiz">
              Take the 60-second care quiz
            </Button>
            <Button variant="secondary" size="lg" href="/bundles/new-dog-starter">
              View dog starter kit
            </Button>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
