/**
 * @file PawraProductCard.jsx
 * @description Soft product card on cream — coral Sale badge, forest price, View product.
 */

import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';
import {JudgeMePreviewBadge} from '~/components/product/JudgeMePreviewBadge';
import {Badge} from '~/components/ui/Badge';
import {useCompare} from '~/components/compare/CompareContext';
import {isPrescriptionRequired} from '~/lib/productFlags';
import {isShopifyCdnImage, resolveProductImage} from '~/lib/resolveProductImage';

/**
 * @param {{
 *   product: any;
 *   loading?: 'eager' | 'lazy';
 *   showCompare?: boolean;
 * }}
 */
export function PawraProductCard({product, loading, showCompare = false}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = resolveProductImage(product);
  const minPrice = product.priceRange?.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    minPrice &&
    compareAt &&
    Number(compareAt.amount) > Number(minPrice.amount);
  const rx = isPrescriptionRequired(product);
  const {has, toggle} = useCompare();
  const checked = has(product.handle);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-surface shadow-sm transition-shadow duration-base hover:shadow-md">
      {showCompare ? (
        <label className="absolute left-3 top-3 z-10 flex cursor-pointer items-center gap-1.5 rounded-md bg-surface/95 px-2 py-1 font-sans text-body-xs text-text-primary shadow-sm">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => toggle(product.handle)}
            className="accent-[rgb(var(--color-action-primary))]"
            aria-label={`Compare ${product.title}`}
          />
          Compare
        </label>
      ) : null}

      <Link to={variantUrl} prefetch="intent" className="group flex flex-1 flex-col no-underline">
        <div className="relative aspect-square overflow-hidden bg-page-bg">
          {image?.url ? (
            isShopifyCdnImage(image.url) ? (
              <Image
                alt={image.altText || product.title}
                aspectRatio="1/1"
                data={image}
                loading={loading}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-base group-hover:scale-[1.02]"
              />
            ) : (
              <img
                src={image.url}
                alt={image.altText || product.title}
                loading={loading || 'lazy'}
                className="h-full w-full object-cover transition-transform duration-base group-hover:scale-[1.02]"
              />
            )
          ) : (
            <ProductImagePlaceholder label={product.title} className="h-full min-h-0 rounded-none" />
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {onSale ? <Badge type="sale" /> : null}
            {rx ? <Badge type="rx-required" /> : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-sans text-body-s font-semibold text-text-primary line-clamp-2">
            {product.title}
          </h3>
          <JudgeMePreviewBadge productId={product.id} className="mt-1" />
          <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
            {minPrice ? (
              <p className="font-mono text-mono-m font-medium text-action-primary">
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
    </div>
  );
}
