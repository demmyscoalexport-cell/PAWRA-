/**
 * @file WalkerProgramSection.jsx
 * @description Homepage section — featured walker, service reviews, referral CTA.
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {
  FEATURED_WALKER,
  WALKER_SERVICE_REVIEWS,
} from '~/lib/walkerProgram';
import walkerHero from '~/assets/images/walker-program-hero.png';

export function WalkerProgramSection() {
  return (
    <SectionReveal>
      <section className="bg-surface px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={walkerHero}
                alt={`${FEATURED_WALKER.name}, professional dog walker, with a dog on a PAWRA-style leash and collar`}
                className="aspect-[4/3] w-full object-cover"
                width={800}
                height={600}
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4">
                <Badge type="walker-approved" />
              </div>
            </div>

            <div>
              <p className="font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
                Walker Referral Program
              </p>
              <h2 className="mt-3 font-serif text-display-m text-text-primary">
                Walkers who clients trust — gear they recommend.
              </h2>
              <p className="mt-4 font-sans text-body-l text-text-secondary">
                Meet {FEATURED_WALKER.name}, {FEATURED_WALKER.role} in{' '}
                {FEATURED_WALKER.location}. {FEATURED_WALKER.blurb}
              </p>
              <p className="mt-4 font-sans text-body-m text-text-secondary">
                Join the PAWRA Walker Referral Program: get your own code, share products your
                clients need, and earn when they shop.
              </p>
              <Button variant="primary" size="lg" href="/pages/walker-program" className="mt-8">
                Join the Walker Program
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WALKER_SERVICE_REVIEWS.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-lg border border-border-subtle bg-page-bg p-6"
              >
                <p className="font-serif text-body-l italic text-text-primary">&ldquo;{review.quote}&rdquo;</p>
                <footer className="mt-4">
                  <p className="font-sans text-body-m font-semibold text-text-primary">{review.name}</p>
                  <p className="font-sans text-body-s text-text-secondary">{review.meta}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
