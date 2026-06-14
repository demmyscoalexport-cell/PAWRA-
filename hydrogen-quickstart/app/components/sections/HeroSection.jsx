import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {PulseRing} from '~/components/ui/PulseRing';
import {Icon} from '~/components/ui/Icon';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';

export function HeroSection() {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-12 md:px-8 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="mb-4 font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-forest-green">
              Smart Pet Technology
            </p>
            <h1 className="font-serif text-display-m text-forest-green md:text-display-xl">
              Peace of mind. For every paw.
            </h1>
            <p className="mt-6 max-w-lg font-sans text-body-l text-ink">
              Smart pet technology designed to keep your dog safer, healthier, and closer —
              wherever they roam.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/collections/all">
                Shop GPS Collar
              </Button>
              <Button variant="ghost" size="lg" href="/pages/about">
                See How It Works
              </Button>
            </div>
            <div className="mt-8 flex items-start gap-3">
              <div className="flex gap-0.5">
                {Array.from({length: 5}, (_, i) => (
                  <Icon key={`hero-star-${i}`} name="star" size="sm" color="text-champagne" className="!h-4 !w-4" />
                ))}
              </div>
              <p className="font-sans text-body-s text-ink/80">
                &ldquo;My dog walker uses this on every walk. I watch in real time.&rdquo;
                <span className="mt-1 block font-medium text-ink">Sarah K., Upper West Side</span>
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <ProductImagePlaceholder
              label="GPS Smart Collar"
              className="min-h-[280px] w-full rounded-xl md:min-h-[420px]"
              aspect="aspect-[4/5] md:aspect-square"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <PulseRing size="lg" />
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
