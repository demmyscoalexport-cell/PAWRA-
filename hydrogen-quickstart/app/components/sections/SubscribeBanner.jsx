/**
 * Subscribe & Save banner — PAWRA recurring delivery CTA.
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Icon} from '~/components/ui/Icon';

const PERKS = [
  {icon: 'check', text: '10% off every recurring order'},
  {icon: 'truck', text: 'Free shipping on subscriptions over $75'},
  {icon: 'heart', text: 'Skip, pause, or cancel anytime'},
];

export function SubscribeBanner() {
  return (
    <SectionReveal>
      <section className="bg-forest-green px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl rounded-2xl border border-electric-jade/20 bg-midnight/40 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-sans text-body-xs font-semibold uppercase tracking-[0.2em] text-electric-jade">
                Subscribe &amp; Save
              </p>
              <h2 className="mt-4 font-serif text-display-s text-cloud">
                Never run out of what they love
              </h2>
              <p className="mt-4 font-sans text-body-l text-cloud/80">
                Set up automatic deliveries on treats, food, and everyday essentials.
                Change your schedule anytime — no commitments, no hassle.
              </p>
              <Button variant="accent" size="lg" href="/pages/subscribe-and-save" className="mt-8">
                Learn about Subscribe &amp; Save
              </Button>
            </div>
            <ul className="space-y-4">
              {PERKS.map((perk) => (
                <li key={perk.text} className="flex items-center gap-3">
                  <Icon name={perk.icon} size="md" color="text-electric-jade" />
                  <span className="font-sans text-body-m text-cloud">{perk.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
