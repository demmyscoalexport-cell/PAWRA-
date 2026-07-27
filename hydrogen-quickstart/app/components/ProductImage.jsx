/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET CARES               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetcares.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file ProductImage.jsx
 * @description Shared component: ProductImage.
 * @author Pawra LLC
 * @website pawrapetcares.com
 */

import {Image} from '@shopify/hydrogen';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 * }}
 */
export function ProductImage({image}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
