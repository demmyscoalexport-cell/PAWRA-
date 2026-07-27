/**
 * @file PawraProductCard.jsx
 * @description Soft product card: image, rating, price, subtle sale badge.
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
      className="group flex flex-col overflow-hidden rounded-lg bg-surface transition-shadow duration-base hover:shadow-sm no-underline"
    >
      <div className="relative aspect-square overflow-hidden bg-page-bg">
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
          <span className="absolute left-3 top-3 rounded-pill bg-sale/10 px-3 py-1 font-sans text-body-xs font-medium uppercase tracking-wide text-sale">
            Sale
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-sans text-body-s font-medium text-text-primary line-clamp-2">{product.title}</h3>
        <JudgeMePreviewBadge productId={product.id} className="mt-1" />
        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
          {minPrice ? (
            <p className="font-mono text-mono-m font-medium text-text-primary">
              <Money data={minPrice} />
            </p>
          ) : null}
          {onSale ? (
            <p className="font-mono text-mono-s text-text-secondary line-through">
              <Money data={compareAt} />
            </p>
          ) : null}
        </div>
        <span className="mt-3 inline-flex items-center justify-center rounded-md border border-border-subtle bg-action-secondary px-3 py-2 font-sans text-body-s font-medium text-text-primary transition-colors group-hover:border-action-primary group-hover:bg-action-primary group-hover:text-action-primary-label">
          View product
        </span>
      </div>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
