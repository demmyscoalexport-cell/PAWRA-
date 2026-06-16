/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file PawraCollectionCard.jsx
 * @description Shared component: PawraCollectionCard.
 * @author Pawra LLC
 * @website pawrapetshop.com
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
      className="group flex flex-col overflow-hidden rounded-xl bg-cloud shadow-card transition-shadow hover:shadow-md no-underline"
    >
      <div className="aspect-[4/3] overflow-hidden bg-warm-oat">
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
      <div className="p-5">
        <h2 className="font-serif text-heading-s text-forest-green">{title}</h2>
        {description && (
          <p className="mt-2 font-sans text-body-s text-ink/70 line-clamp-2">{description}</p>
        )}
        {countLabel && (
          <p className="mt-3 font-mono text-mono-s text-ink/50">{countLabel}</p>
        )}
      </div>
    </Link>
  );
}
