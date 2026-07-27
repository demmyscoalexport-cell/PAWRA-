/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET CARES               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetcares.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file PawraCollectionCard.jsx
 * @description Shared component: PawraCollectionCard.
 * @author Pawra LLC
 * @website pawrapetcares.com
 */

import {Link} from 'react-router';
import {ProductImagePlaceholder} from '~/components/sections/ProductImagePlaceholder';

/**
 * @param {{
 *   title: string;
 *   description?: string;
 *   to: string;
 *   productCount?: number | null;
 *   productCountLabel?: string | null;
 *   image?: {url: string; altText?: string | null} | null;
 * }}
 */
export function PawraCollectionCard({
  title,
  description,
  to,
  productCount,
  productCountLabel,
  image,
}) {
  const countLabel =
    productCountLabel ??
    (typeof productCount === 'number' ? `${productCount} products` : null);

  return (
    <Link
      to={to}
      prefetch="intent"
      className="group flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface transition-shadow hover:shadow-sm no-underline"
    >
      <div className="aspect-[4/3] overflow-hidden bg-page-bg">
        {image?.url ? (
          <img
            src={image.url}
            alt={image.altText || title}
            className="h-full w-full object-cover transition-transform duration-base group-hover:scale-[1.02]"
          />
        ) : (
          <ProductImagePlaceholder label={title} className="h-full min-h-0 rounded-none" />
        )}
      </div>
      <div className="p-4">
        <h2 className="font-sans text-heading-s text-text-primary">{title}</h2>
        {description && (
          <p className="mt-2 font-sans text-body-s text-text-secondary line-clamp-2">{description}</p>
        )}
        {countLabel && (
          <p className="mt-3 font-mono text-mono-s text-text-secondary">{countLabel}</p>
        )}
      </div>
    </Link>
  );
}
