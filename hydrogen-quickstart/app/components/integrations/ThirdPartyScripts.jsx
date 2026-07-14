import {useEffect} from 'react';

/**
 * Loads third-party app scripts when env vars are configured in Oxygen / .env.
 * @param {{ integrations?: Record<string, unknown> | null }} props
 */
export function ThirdPartyScripts({integrations}) {
  useEffect(() => {
    if (!integrations) return;

    /** @type {HTMLScriptElement[]} */
    const injected = [];

    if (integrations.klaviyo?.companyId) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${integrations.klaviyo.companyId}`;
      document.head.appendChild(s);
      injected.push(s);
    }

    if (integrations.ga4?.measurementId) {
      const gtag = document.createElement('script');
      gtag.async = true;
      gtag.src = `https://www.googletagmanager.com/gtag/js?id=${integrations.ga4.measurementId}`;
      document.head.appendChild(gtag);
      injected.push(gtag);

      const inline = document.createElement('script');
      inline.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${integrations.ga4.measurementId}');
      `;
      document.head.appendChild(inline);
      injected.push(inline);
    }

    if (integrations.swym?.storeId) {
      window.SwymCallbacks = window.SwymCallbacks || [];
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://cdn.swymrelay.com/code/swym-shopify.js?shop=${integrations.swym.storeId}`;
      document.head.appendChild(s);
      injected.push(s);
    }

    if (integrations.smile?.publishableKey) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://js.smile.io/v1/smile-shopify.js';
      s.dataset.channelKey = integrations.smile.publishableKey;
      document.head.appendChild(s);
      injected.push(s);
    }

    if (integrations.gorgias?.widgetId) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://config.gorgias.chat/gorgias-chat-bundle-loader.js?applicationId=${integrations.gorgias.widgetId}`;
      document.head.appendChild(s);
      injected.push(s);
    }

    if (integrations.judgeMe?.shopDomain) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://cdn.judge.me/widget_preloader.js?shop=${integrations.judgeMe.shopDomain}`;
      document.head.appendChild(s);
      injected.push(s);
    }

    return () => {
      for (const node of injected) {
        node.remove();
      }
    };
  }, [integrations]);

  return null;
}
