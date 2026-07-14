/**
 * @file CompleteYourSetup.jsx
 * @description Horizontal featured products row from Shopify catalog.
 */

import {SectionReveal} from './SectionReveal';
import {PawraProductCard} from '~/components/PawraProductCard';
import {Button} from '~/components/ui/Button';

/**
 * @param {{ products?: import('~/lib/homepageProducts').HomepageProduct[] }} props
 */
export function CompleteYourSetup({products = []}) {
  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-display-s text-forest-green">
            Everything your pet needs. Nothing they don&apos;t.
          </h2>
          {products.length > 0 ? (
            <div className="mt-10 flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
              {products.map((product, index) => (
                <div key={product.id} className="min-w-[240px] flex-shrink-0 md:min-w-0">
                  <PawraProductCard product={product} loading={index < 2 ? 'eager' : undefined} />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center font-sans text-body-m text-ink/60">
              Products will appear here once published to your Headless storefront.
            </p>
          )}
          <div className="mt-10 text-center">
            <Button variant="ghost" size="lg" href="/collections/all">
              View all products
            </Button>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
