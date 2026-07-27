import {useRouteLoaderData} from 'react-router';
import {Icon} from '~/components/ui/Icon';

/**
 * Swym wishlist save button — visible when PUBLIC_SWYM_STORE_ID is configured.
 * Relies on Swym's headless/shopify JS attaching to `.swym-button` when present.
 *
 * @param {{
 *   product?: { id?: string; handle?: string; title?: string };
 *   selectedVariant?: { id?: string };
 *   className?: string;
 * }} props
 */
export function WishlistButton({product, selectedVariant, className = ''}) {
  /** @type {{ integrations?: { swym?: { storeId?: string } | null } } | undefined} */
  const rootData = useRouteLoaderData('root');
  if (!rootData?.integrations?.swym?.storeId || !product?.id) return null;

  const epi = selectedVariant?.id || '';
  const empi = product.id;
  const du = product.handle ? `/products/${product.handle}` : '';

  return (
    <button
      type="button"
      className={`swym-button swym-add-to-wishlist inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-action-primary/25 bg-page-bg font-sans text-body-s font-semibold text-action-primary transition-colors hover:border-action-primary hover:bg-action-primary hover:text-action-primary-label reset ${className}`.trim()}
      data-product-id={empi}
      data-variant-id={epi}
      data-product-url={du}
      aria-label={`Save ${product.title || 'product'} to wishlist`}
    >
      <Icon name="heart" size="sm" color="text-inherit" />
      Save to wishlist
    </button>
  );
}
