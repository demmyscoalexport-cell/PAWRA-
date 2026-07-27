/**
 * @file PawraProductCard.jsx
 * @description Minimal product card — soft hover shadow, text sale label.
 */

import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';
import {JudgeMePreviewBadge} from '~/components/product/JudgeMePreviewBadge';
import {Badge} from '~/components/ui/Badge';
import {useCompare} from '~/components/compare/CompareContext';
import {isPrescriptionRequired} from '~/lib/productFlags';

/**
 * @param {{
 *   product: any;
 *   loading?: 'eager' | 'lazy';
 *   showCompare?: boolean;
 * }}
 */
export function PawraProductCard({product, loading, showCompare = false}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
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
    <div className="group relative flex flex-col bg-page-bg transition-shadow duration-base hover:shadow-sm">
      {showCompare ? (
        <label className="absolute left-3 top-3 z-10 flex cursor-pointer items-center gap-1.5 bg-page-bg/90 px-2 py-1 font-sans text-body-xs text-text-secondary">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => toggle(product.handle)}
            className="accent-[rgb(var(--color-text-primary))]"
            aria-label={`Compare ${product.title}`}
          />
          Compare
        </label>
      ) : null}

      <Link to={variantUrl} prefetch="intent" className="flex flex-1 flex-col no-underline">
        <div className="relative aspect-square overflow-hidden rounded-md bg-surface">
          {image?.url ? (
            image.url.includes('cdn.shopify.com') ? (
              <Image
                alt={image.altText || product.title}
                aspectRatio="1/1"
                data={image}
                loading={loading}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
              />
            ) : (
              <img
                src={image.url}
                alt={image.altText || product.title}
                loading={loading || 'lazy'}
                className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
              />
            )
          ) : (
            <ProductImagePlaceholder label={product.title} className="h-full min-h-0 rounded-none" />
          )}
        </div>
        <div className="flex flex-1 flex-col px-1 pt-4 pb-2">
          <div className="mb-2 flex flex-wrap gap-3">
            {onSale ? <Badge type="sale" /> : null}
            {rx ? <Badge type="rx-required" /> : null}
          </div>
          <h3 className="font-sans text-body-s font-medium text-text-primary line-clamp-2">{product.title}</h3>
          <JudgeMePreviewBadge productId={product.id} className="mt-1" />
          <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
            {minPrice ? (
              <p className="font-mono text-mono-m text-text-primary">
                <Money data={minPrice} />
              </p>
            ) : null}
            {onSale ? (
              <p className="font-mono text-mono-s text-text-secondary line-through">
                <Money data={compareAt} />
              </p>
            ) : null}
          </div>
          <span className="mt-4 inline-flex h-10 items-center justify-center border border-transparent font-sans text-body-s font-medium text-text-primary opacity-0 transition-all group-hover:border-border-subtle group-hover:opacity-100">
            Quick view
          </span>
        </div>
      </Link>
    </div>
  );
}
