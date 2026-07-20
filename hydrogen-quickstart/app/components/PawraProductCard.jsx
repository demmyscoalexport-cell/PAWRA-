/**
 * @file PawraProductCard.jsx
 * @description Chewy-style product card: image, rating, price, sale badge.
 */

import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';
import {JudgeMePreviewBadge} from '~/components/product/JudgeMePreviewBadge';

/**
 * @param {{
 *   product: ProductItemFragment | CollectionItemFragment | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function PawraProductCard({product, loading}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const minPrice = product.priceRange?.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    minPrice &&
    compareAt &&
    Number(compareAt.amount) > Number(minPrice.amount);

  return (
    <Link
      to={variantUrl}
      prefetch="intent"
      className="group flex flex-col overflow-hidden rounded-xl bg-cloud shadow-card transition-shadow hover:shadow-md no-underline"
    >
      <div className="relative aspect-square overflow-hidden bg-warm-oat">
        {image ? (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-base group-hover:scale-[1.02]"
          />
        ) : (
          <ProductImagePlaceholder label={product.title} className="h-full min-h-0 rounded-none" />
        )}
        {onSale ? (
          <span className="absolute left-3 top-3 rounded-md bg-coral px-2 py-1 font-sans text-body-s font-semibold text-cloud">
            Sale
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-sans text-body-m font-semibold text-ink line-clamp-2">{product.title}</h3>
        <JudgeMePreviewBadge productId={product.id} className="mt-1" />
        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
          {minPrice ? (
            <p className="font-mono text-mono-m font-semibold text-forest-green">
              <Money data={minPrice} />
            </p>
          ) : null}
          {onSale ? (
            <p className="font-mono text-mono-s text-ink/40 line-through">
              <Money data={compareAt} />
            </p>
          ) : null}
        </div>
        <span className="mt-3 inline-flex items-center justify-center rounded-md border border-forest-green/20 bg-warm-oat px-3 py-2 font-sans text-body-s font-semibold text-forest-green transition-colors group-hover:border-forest-green group-hover:bg-forest-green group-hover:text-cloud">
          View product
        </span>
      </div>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
