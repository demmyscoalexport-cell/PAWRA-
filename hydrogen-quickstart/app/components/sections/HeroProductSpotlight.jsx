import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';

const FEATURES = ['GPS', 'Waterproof', '7-day battery', 'App connected', 'Lightweight'];

export function HeroProductSpotlight() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductImagePlaceholder
            label="PAWRA GPS Smart Collar"
            className="min-h-[320px] w-full rounded-xl lg:min-h-[480px]"
            aspect="aspect-square"
          />
          <div>
            <h2 className="font-serif text-display-s text-forest-green md:text-display-m">
              PAWRA GPS Smart Collar
            </h2>
            <p className="mt-2 font-serif text-heading-s italic text-forest-green/80">The flagship.</p>
            <p className="mt-6 font-sans text-body-l text-ink">
              Real-time location. Geofence alerts. Health monitoring. Built for dogs who live in
              the city.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {FEATURES.map((f) => (
                <span
                  key={f}
                  className="rounded-pill border border-forest-green px-3 py-1 font-sans text-body-xs font-medium text-forest-green"
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-8 font-mono text-mono-l text-forest-green">From $69</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/collections/all">
                Add to Cart
              </Button>
              <Button variant="secondary" size="lg" href="/collections/all">
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
