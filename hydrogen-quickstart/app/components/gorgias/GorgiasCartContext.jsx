import {useEffect} from 'react';
import {toGorgiasShopifyCart, whenGorgiasReady} from '~/lib/gorgias';

/**
 * Syncs the live Hydrogen cart into Gorgias for Shopping Assistant / ticket sidebar.
 *
 * @param {{cart?: any}} props
 */
export function GorgiasCartContext({cart}) {
  useEffect(() => {
    const payload = toGorgiasShopifyCart(cart);
    if (!payload) return;

    window._gorgiasCart = payload;

    let cancelled = false;

    whenGorgiasReady().then((api) => {
      if (cancelled || !api?.captureShopifyCart) return;
      try {
        api.captureShopifyCart(payload);
      } catch {
        // Best-effort only.
      }
    });

    return () => {
      cancelled = true;
    };
  }, [cart]);

  return null;
}
