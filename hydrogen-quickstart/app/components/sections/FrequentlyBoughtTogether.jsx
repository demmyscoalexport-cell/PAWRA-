import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';

const BUNDLE = ['Pet Food', 'Comfort Bed', 'Grooming Kit'];

export function FrequentlyBoughtTogether() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-display-s text-forest-green">
            Popular bundle for new pet parents
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {BUNDLE.map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <ProductImagePlaceholder label={item} className="h-24 w-24 rounded-lg" aspect="" />
                {i < BUNDLE.length - 1 && (
                  <span className="font-mono text-mono-l text-forest-green">+</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 font-sans text-body-m text-ink/70">
            Start with essentials — food, comfort, and grooming — in one order.
          </p>
          <Button variant="primary" size="lg" href="/collections/all" className="mt-8 w-full max-w-md">
            Shop Essentials
          </Button>
        </div>
      </section>
    </SectionReveal>
  );
}
