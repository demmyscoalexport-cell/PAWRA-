import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {Icon} from '~/components/ui/Icon';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';

const BUNDLE = ['GPS Collar', 'LED Collar', 'Activity Tracker'];

export function FrequentlyBoughtTogether() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-display-s text-forest-green">
            Customers in New York love this combination
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {BUNDLE.map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <ProductImagePlaceholder label={item} className="h-24 w-24 rounded-lg" aspect="" />
                {i < BUNDLE.length - 1 && (
                  <Icon name="plus" size="md" color="text-forest-green" className="!h-6 !w-6" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-mono-m text-ink/50 line-through">Individual total: $131</span>
            <span className="font-mono text-mono-l text-electric-jade">Bundle price: $109</span>
            <Badge type="sale" className="!bg-coral !text-cloud" />
            <span className="rounded-pill bg-coral/15 px-3 py-1 font-sans text-body-xs font-medium text-coral">
              Save $22
            </span>
          </div>
          <Button variant="primary" size="lg" href="/collections/all" className="mt-8 w-full max-w-md">
            Add Bundle to Cart
          </Button>
        </div>
      </section>
    </SectionReveal>
  );
}
