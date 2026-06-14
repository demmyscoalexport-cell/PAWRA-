import {useState} from 'react';
import {SectionReveal} from './SectionReveal';
import {Icon} from '~/components/ui/Icon';

const FAQS = [
  {
    q: 'How does the GPS collar work?',
    a: 'The PAWRA GPS Smart Collar uses cellular and GPS technology to update your dog\'s location every 30 seconds. View live tracking, set geofences, and receive instant alerts through the PAWRA app.',
  },
  {
    q: 'What is the battery life?',
    a: 'The GPS collar delivers up to 7 days of battery life on a single charge with typical daily use. Low-battery alerts are sent to your phone before it runs out.',
  },
  {
    q: 'Is the collar waterproof?',
    a: 'Yes. The PAWRA GPS Smart Collar is IP67 rated — fully waterproof for rain, snow, and splashes during city walks.',
  },
  {
    q: 'How do I track my dog\'s location?',
    a: 'Download the PAWRA app, pair your collar, and open the live map. Share access with walkers or family members so everyone stays connected.',
  },
  {
    q: 'What is the PAWRA Walker Program?',
    a: 'Our Walker Program connects professional NYC dog walkers with PAWRA GPS tracking. Owners watch walks in real time; walkers get verified credentials and tools.',
  },
  {
    q: 'Do you ship across the US?',
    a: 'Yes. We ship to all 50 states. Free shipping on orders over $75. Most orders arrive within 3–5 business days.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">
            Frequently asked questions
          </h2>
          <div className="mt-10 divide-y divide-forest-green/15 border-y border-forest-green/15">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left reset"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-body-m font-semibold text-forest-green">
                      {item.q}
                    </span>
                    <Icon
                      name="chevron-down"
                      size="md"
                      color="text-electric-jade"
                      className={`shrink-0 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 font-sans text-body-m text-ink">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
