import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';

const REVIEWS = [
  {
    quote:
      'Took my dog to Central Park and he slipped his leash near the Reservoir. Had his location on my phone in seconds. PAWRA paid for itself that day.',
    name: 'Marcus T.',
    meta: 'Upper East Side · dog Bruno',
  },
  {
    quote:
      'My walker sends me a screenshot of the GPS map every morning. I can see exactly where Milo is during his walk. Worth every penny.',
    name: 'Priya S.',
    meta: 'Brooklyn Heights · dog Milo',
  },
  {
    quote:
      'The smart fountain means I never worry about water when I am in long meetings. The feeder handles everything.',
    name: 'James O.',
    meta: 'Tribeca · dog Luna',
  },
];

export function Testimonials() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">
            What New York pet owners are saying.
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
