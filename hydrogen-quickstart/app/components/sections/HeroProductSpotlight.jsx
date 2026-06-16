/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file HeroProductSpotlight.jsx
 * @description Homepage/marketing section: HeroProductSpotlight.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';

const FEATURES = ['Premium', 'Cats & Dogs', 'Fast Shipping', 'Curated', 'Trusted'];

export function HeroProductSpotlight() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductImagePlaceholder
            label="Featured Product"
            className="min-h-[320px] w-full rounded-xl lg:min-h-[480px]"
            aspect="aspect-square"
          />
          <div>
            <h2 className="font-serif text-display-s text-forest-green md:text-display-m">
              Featured from our catalog
            </h2>
            <p className="mt-2 font-serif text-heading-s italic text-forest-green/80">Hand-picked for your pets.</p>
            <p className="mt-6 font-sans text-body-l text-ink">
              Discover premium food, beds, toys, grooming supplies, and wellness products —
              all in one place for cats and dogs.
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
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/collections/all">
                Shop Now
              </Button>
              <Button variant="secondary" size="lg" href="/collections">
                Browse Collections
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
