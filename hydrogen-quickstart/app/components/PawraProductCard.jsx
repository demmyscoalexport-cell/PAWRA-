/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file PawraProductCard.jsx
 * @description Shared component: PawraProductCard.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';

/**
 * @param {{
 *   product: ProductItemFragment | CollectionItemFragment | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function PawraProductCard({product, loading}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  return (
    <Link
      to={variantUrl}
      prefetch="intent"
      className="group flex flex-col overflow-hidden rounded-xl bg-cloud shadow-card transition-shadow hover:shadow-md no-underline"
    >
      <div className="aspect-square overflow-hidden bg-warm-oat">
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
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-sans text-body-m font-semibold text-ink line-clamp-2">{product.title}</h3>
        <p className="mt-2 font-mono text-mono-m text-forest-green">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
      </div>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
