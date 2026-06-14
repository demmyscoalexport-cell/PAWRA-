import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';

const PRODUCTS = [
  {name: 'PAWRA GPS Smart Collar', price: 'From $69', desc: 'Real-time GPS for city dogs', badge: 'best-seller'},
  {name: 'PAWRA Smart Water Fountain', price: 'From $45', desc: 'Always-fresh hydration tracking', badge: null},
  {name: 'PAWRA Automatic Smart Feeder', price: 'From $55', desc: 'Scheduled meals, app controlled', badge: null},
  {name: 'PAWRA LED Safety Collar', price: 'From $22', desc: 'Visible on every evening walk', badge: null},
  {name: 'PAWRA Activity Tracker', price: 'From $35', desc: 'Daily steps and wellness insights', badge: null},
];

export function CompleteYourSetup() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">
            Everything your pet needs. Nothing they don&apos;t.
          </h2>
          <div className="mt-10 flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
            {PRODUCTS.map((product) => (
              <article
                key={product.name}
                className="min-w-[240px] flex-shrink-0 rounded-lg bg-cloud p-4 shadow-card transition-shadow hover:shadow-elevated md:min-w-0"
              >
                <ProductImagePlaceholder label={product.name.split(' ').slice(-2).join(' ')} className="rounded-md" />
                {product.badge && (
                  <div className="mt-3">
                    <Badge type={product.badge} />
                  </div>
                )}
                <h3 className="mt-3 font-sans text-body-m font-semibold text-ink">{product.name}</h3>
                <p className="mt-1 font-sans text-body-s text-ink/60">{product.desc}</p>
                <p className="mt-3 font-mono text-mono-m text-forest-green">{product.price}</p>
                <Button variant="primary" size="sm" className="mt-4 w-full" href="/collections/all">
                  Add to Cart
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
