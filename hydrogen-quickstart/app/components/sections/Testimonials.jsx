/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file Testimonials.jsx
 * @description Homepage/marketing section: Testimonials.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';

const REVIEWS = [
  {
    quote:
      'Finally found a store that carries quality food and beds for both my cat and dog. Fast shipping and great packaging.',
    name: 'Marcus T.',
    meta: 'Maine · dog Bruno & cat Cleo',
  },
  {
    quote:
      'The grooming kit and treats arrived quickly. Everything feels premium — exactly what I wanted for my pets.',
    name: 'Priya S.',
    meta: 'Vermont · dog Milo',
  },
  {
    quote:
      'PAWRA has become our go-to for pet supplies. Reliable quality and excellent customer support.',
    name: 'James O.',
    meta: 'New Hampshire · dog Luna',
  },
];

export function Testimonials() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">
            What pet owners are saying.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <article key={review.name} className="rounded-xl bg-cloud p-6 shadow-card">
                <div className="flex gap-0.5">
                  {Array.from({length: 5}, (_, i) => (
                    <Icon key={`${review.name}-star-${i}`} name="star" size="sm" color="text-champagne" className="!h-4 !w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 line-clamp-4 font-serif text-heading-xs italic text-ink">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <p className="mt-4 font-sans text-body-m font-semibold text-ink">{review.name}</p>
                <p className="font-sans text-body-s text-ink/60">{review.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
