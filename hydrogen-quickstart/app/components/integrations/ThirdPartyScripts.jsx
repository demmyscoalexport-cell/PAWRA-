import {useEffect} from 'react';
import {ensureKlaviyoQueue} from '~/lib/marketing';

/**
 * Loads third-party scripts once after idle so first paint stays fast.
 * Scripts are intentionally NOT removed on unmount (SPA navigations).
 * Judge.me → useJudgeme in root. Gorgias → GorgiasProvider.
 * @param {{ integrations?: Record<string, any> | null }} props
 */
export function ThirdPartyScripts({integrations}) {
  useEffect(() => {
    if (!integrations) return;

    let cancelled = false;

    function inject() {
      if (cancelled) return;

      if (integrations.klaviyo?.companyId) {
        ensureKlaviyoQueue();
        injectScriptOnce(
          `klaviyo-onsite-${integrations.klaviyo.companyId}`,
          `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${integrations.klaviyo.companyId}`,
        );
      }

      if (integrations.ga4?.measurementId) {
        const id = integrations.ga4.measurementId;
        injectScriptOnce(
          `ga4-gtag-${id}`,
          `https://www.googletagmanager.com/gtag/js?id=${id}`,
        );
        if (!document.getElementById(`ga4-config-${id}`)) {
          const inline = document.createElement('script');
          inline.id = `ga4-config-${id}`;
          inline.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${id}', { send_page_view: false });
          `;
          document.head.appendChild(inline);
        }
      }

      if (integrations.swym?.storeId) {
        window.SwymCallbacks = window.SwymCallbacks || [];
        injectScriptOnce(
          `swym-${integrations.swym.storeId}`,
          `https://cdn.swymrelay.com/code/swym-shopify.js?shop=${integrations.swym.storeId}`,
        );
      }

      if (integrations.smile?.publishableKey) {
        if (!document.getElementById('smile-ui-script')) {
          const s = document.createElement('script');
          s.id = 'smile-ui-script';
          s.async = true;
          s.src = 'https://js.smile.io/v1/smile-shopify.js';
          s.dataset.channelKey = integrations.smile.publishableKey;
          document.head.appendChild(s);
        }
      }
    }

    /** @type {number | ReturnType<typeof setTimeout>} */
    let handle;
    if (typeof window.requestIdleCallback === 'function') {
      handle = window.requestIdleCallback(inject, {timeout: 2500});
    } else {
      handle = setTimeout(inject, 1200);
    }

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === 'function' && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(/** @type {ReturnType<typeof setTimeout>} */ (handle));
      }
      // Do not remove injected scripts — analytics/loyalty must persist across routes.
    };
  }, [integrations]);

  return null;
}

/**
 * @param {string} id
 * @param {string} src
 */
function injectScriptOnce(id, src) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}
