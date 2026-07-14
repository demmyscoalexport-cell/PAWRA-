/**
 * @file FrequentlyBoughtTogether.jsx
 * @description Popular product trio from live catalog.
 */

import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {SectionReveal} from './SectionReveal';
import {Button} from '~/components/ui/Button';
import {ProductImagePlaceholder} from './ProductImagePlaceholder';
import {useVariantUrl} from '~/lib/variants';

/**
 * @param {{ products?: import('~/lib/homepageProducts').HomepageProduct[] }} props
 */
export function FrequentlyBoughtTogether({products = []}) {
  const items = products.slice(0, 3);

  return (
    <SectionReveal>
      <section className="bg-warm-oat px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-display-s text-forest-green">
            Popular picks for pet parents
          </h2>
          {items.length > 0 ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {items.map((product, i) => (
                <BundleTile key={product.id} product={product} showPlus={i < items.length - 1} />
              ))}
            </div>
          ) : (
            <p className="mt-10 font-sans text-body-m text-ink/60">
              Bundle suggestions appear when products are available.
            </p>
          )}
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

/** @param {{ product: import('~/lib/homepageProducts').HomepageProduct; showPlus: boolean }} props */
function BundleTile({product, showPlus}) {
  const url = useVariantUrl(product.handle);

  return (
    <div className="flex items-center gap-4">
      <Link to={url} className="group block w-28 no-underline sm:w-32">
        {product.featuredImage ? (
          <Image
            data={product.featuredImage}
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            sizes="128px"
            className="rounded-lg object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : (
          <ProductImagePlaceholder label={product.title} className="h-24 w-24 rounded-lg sm:h-32 sm:w-32" aspect="" />
        )}
        <p className="mt-2 line-clamp-2 font-sans text-body-xs font-medium text-ink">{product.title}</p>
        {product.priceRange?.minVariantPrice && (
          <p className="mt-1 font-mono text-mono-s text-forest-green">
            <Money data={product.priceRange.minVariantPrice} />
          </p>
        )}
      </Link>
      {showPlus && <span className="font-mono text-mono-l text-forest-green">+</span>}
    </div>
  );
}
