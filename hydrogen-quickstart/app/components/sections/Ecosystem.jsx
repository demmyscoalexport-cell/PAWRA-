import {SectionReveal} from './SectionReveal';
import {Badge} from '~/components/ui/Badge';
import {Icon} from '~/components/ui/Icon';

const ITEMS = [
  {icon: 'gps', name: 'GPS Collar', badge: 'in-stock', badgeLabel: 'Available Now', desc: 'Real-time location and safety alerts'},
  {icon: 'paw', name: 'PAWRA App', badge: 'in-stock', badgeLabel: 'Available Now', desc: 'Track, monitor, and manage your pet ecosystem'},
  {icon: 'leaf', name: 'PAWRA AI', badge: 'in-stock', badgeLabel: 'Available Now', desc: 'Smart insights for health and behavior'},
  {icon: 'shield', name: 'Smart Home Devices', badge: 'coming-soon', badgeLabel: 'Coming Soon', desc: 'Fountain, feeder, and home integrations'},
];

export function Ecosystem() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-display-s text-forest-green">
            More than a collar. A complete pet-care ecosystem.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-body-l text-ink">
            Every PAWRA product is designed to work together.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <article
                key={item.name}
                className="rounded-xl border border-forest-green/30 bg-midnight p-6 text-left"
              >
                <Icon name={item.icon} size="lg" color="text-electric-jade" className="!h-10 !w-10" />
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <h3 className="font-sans text-body-l font-semibold text-cloud">{item.name}</h3>
                  <Badge type={item.badge} />
                </div>
                <p className="mt-3 font-sans text-body-s text-cloud/70">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
