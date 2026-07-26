import {useEffect} from 'react';
import {useLocation} from 'react-router';
import {pageTypeFromPath} from '~/lib/gorgias';

/**
 * Publishes current page / product context for Gorgias AI Agent.
 * Render at root (auto path detection) and optionally on product routes
 * with richer product metadata.
 *
 * @param {{
 *   pageType?: 'home' | 'product' | 'collection' | 'cart' | 'account' | 'search' | 'blog' | 'other';
 *   product?: {
 *     id?: string;
 *     title?: string;
 *     handle?: string;
 *     price?: string;
 *   } | null;
 * }} props
 */
export function GorgiasPageContext({pageType, product = null}) {
  const location = useLocation();
  const resolvedType = pageType || pageTypeFromPath(location.pathname);

  useEffect(() => {
    const context = {
      page_type: resolvedType,
      page_url: typeof window !== 'undefined' ? window.location.href : location.pathname,
      page_path: location.pathname,
      ...(product
        ? {
            product_id: product.id || '',
            product_title: product.title || '',
            product_handle: product.handle || '',
            product_price: product.price || '',
          }
        : {}),
    };

    window._gorgiasPageContext = context;
    window.dispatchEvent(new CustomEvent('pawra:gorgias-page', {detail: context}));
  }, [location.pathname, location.search, resolvedType, product?.id, product?.handle, product?.price, product?.title]);

  return null;
}
