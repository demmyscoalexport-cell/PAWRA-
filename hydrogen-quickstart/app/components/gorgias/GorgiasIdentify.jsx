import {useEffect} from 'react';
import {whenGorgiasReady} from '~/lib/gorgias';

/**
 * Passes the known shopper email into Gorgias so AI Agent can look up orders.
 *
 * @param {{
 *   customer?: {
 *     email?: string;
 *     name?: string;
 *     id?: string;
 *     phone?: string;
 *   } | null;
 * }} props
 */
export function GorgiasIdentify({customer}) {
  useEffect(() => {
    const email = customer?.email?.trim();
    if (!email) return;

    let cancelled = false;

    whenGorgiasReady().then((api) => {
      if (cancelled || !api?.captureUserEmail) return;
      try {
        api.captureUserEmail(email);
      } catch {
        // Gorgias API is best-effort; never break the storefront.
      }
    });

    return () => {
      cancelled = true;
    };
  }, [customer?.email]);

  return null;
}
