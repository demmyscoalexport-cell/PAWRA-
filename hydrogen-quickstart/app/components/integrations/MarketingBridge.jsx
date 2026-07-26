import {useEffect} from 'react';
import {useLocation} from 'react-router';
import {useAnalytics} from '@shopify/hydrogen';
import {
  klaviyoAddedToCartProps,
  klaviyoViewedProductProps,
  trackGa4Event,
  trackGa4PageView,
  trackKlaviyoEvent,
} from '~/lib/marketing';

/**
 * Forwards Hydrogen Analytics events to GA4 + Klaviyo when configured.
 * @param {{
 *   ga4MeasurementId?: string | null;
 *   klaviyoEnabled?: boolean;
 * }} props
 */
export function MarketingBridge({ga4MeasurementId, klaviyoEnabled}) {
  const location = useLocation();
  const {subscribe, register} = useAnalytics();
  const {ready} = register('PAWRA Marketing Bridge');

  // SPA page views for GA4
  useEffect(() => {
    if (!ga4MeasurementId) return;
    trackGa4PageView(
      ga4MeasurementId,
      `${location.pathname}${location.search}`,
      document.title,
    );
  }, [ga4MeasurementId, location.pathname, location.search]);

  useEffect(() => {
    if (!ga4MeasurementId && !klaviyoEnabled) {
      ready();
      return;
    }

    const unsubscribers = [
      subscribe('product_viewed', (payload) => {
        if (ga4MeasurementId) {
          const product = payload?.products?.[0] || {};
          trackGa4Event('view_item', {
            currency: product.price?.currencyCode || 'USD',
            value: Number(product.price?.amount || 0),
            items: [
              {
                item_id: product.id,
                item_name: product.title,
              },
            ],
          });
        }
        if (klaviyoEnabled) {
          trackKlaviyoEvent('Viewed Product', klaviyoViewedProductProps(payload));
        }
      }),
      subscribe('product_added_to_cart', (payload) => {
        if (ga4MeasurementId) {
          trackGa4Event('add_to_cart', {
            currency: 'USD',
            items: [{item_name: 'cart_add'}],
          });
        }
        if (klaviyoEnabled) {
          trackKlaviyoEvent('Added to Cart', klaviyoAddedToCartProps(payload));
        }
      }),
      subscribe('collection_viewed', (payload) => {
        if (ga4MeasurementId) {
          trackGa4Event('view_item_list', {
            item_list_name: payload?.collection?.handle || 'collection',
          });
        }
      }),
      subscribe('search_viewed', (payload) => {
        if (ga4MeasurementId) {
          trackGa4Event('search', {search_term: payload?.searchTerm || ''});
        }
      }),
    ];

    ready();
    return () => {
      for (const unsub of unsubscribers) {
        if (typeof unsub === 'function') unsub();
      }
    };
  }, [subscribe, ready, ga4MeasurementId, klaviyoEnabled]);

  return null;
}
