/**
 * Best sellers row — social proof and fast discovery.
 */

import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {PawraProductCard} from '~/components/PawraProductCard';

/**
 * @param {{products?: Array<import('storefrontapi.generated').ProductItemFragment>}} props
 */
export function BestSellers({products = []}) {
  const display = products.slice(0, 4);

  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-body-xs font-semibold uppercase tracking-[0.2em] text-forest-green">
                PAWRA Curated
              </p>
              <h2 className="mt-2 font-serif text-display-s text-forest-green">Best Sellers</h2>
              <p className="mt-3 max-w-xl font-sans text-body-l text-ink/80">
                Top-rated favorites loved by pet parents nationwide.
              </p>
            </div>
            <Button variant="secondary" size="md" href="/collections/best-sellers">
              View all best sellers
            </Button>
          </div>
          {display.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {display.map((product, index) => (
                <PawraProductCard
                  key={product.id}
                  product={product}
                  loading={index < 4 ? 'eager' : undefined}
                />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center font-sans text-body-m text-ink/60">
              <a href="/collections/all" className="text-forest-green underline">
                Browse all products
              </a>{' '}
              — tag bestsellers in Shopify to populate this section automatically.
            </p>
          )}
        </div>
      </section>
    </SectionReveal>
  );
}
