/**
 * @file HeroProductSpotlight.jsx
 * @description Featured product spotlight from Shopify catalog.
 */

import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';
import {useVariantUrl} from '~/lib/variants';

const FEATURES = ['Premium', 'Cats & Dogs', 'Fast Shipping', 'Curated', 'Trusted'];

/**
 * @param {{ product?: import('~/lib/homepageProducts').HomepageProduct | null }} props
 */
export function HeroProductSpotlight({product}) {
  const variantUrl = useVariantUrl(product?.handle ?? '');
  const productUrl = product ? variantUrl : '/collections/all';

  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Link to={productUrl} className="block no-underline">
            {product?.featuredImage ? (
              <Image
                data={product.featuredImage}
                alt={product.featuredImage.altText || product.title}
                aspectRatio="1/1"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="min-h-[320px] w-full rounded-xl object-cover lg:min-h-[480px]"
              />
            ) : (
              <ProductImagePlaceholder
                label={product?.title ?? 'Featured Product'}
                className="min-h-[320px] w-full rounded-xl lg:min-h-[480px]"
                aspect="aspect-square"
              />
            )}
          </Link>
          <div>
            <h2 className="font-serif text-display-s text-forest-green md:text-display-m">
              {product?.title ?? 'Featured from our catalog'}
            </h2>
            <p className="mt-2 font-serif text-heading-s italic text-forest-green/80">
              Hand-picked for your pets.
            </p>
            {product?.priceRange?.minVariantPrice && (
              <p className="mt-4 font-mono text-mono-l text-forest-green">
                <Money data={product.priceRange.minVariantPrice} />
              </p>
            )}
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
              <Button variant="primary" size="lg" href={productUrl}>
                {product ? 'View Product' : 'Shop Now'}
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
