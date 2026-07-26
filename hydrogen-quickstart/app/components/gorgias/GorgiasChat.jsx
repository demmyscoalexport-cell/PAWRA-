import {useEffect} from 'react';
import {
  GORGIAS_CONVERT_SCRIPT_ID,
  GORGIAS_WIDGET_SCRIPT_ID,
  resolveGorgiasConfig,
} from '~/lib/gorgias';

/**
 * Loads Gorgias Chat v3 + Convert campaign bundle once into document.body.
 * Client-only — never runs during SSR.
 *
 * @param {{
 *   widgetId?: string;
 *   convertId?: string;
 *   enabled?: boolean;
 * }} props
 */
export function GorgiasChat({widgetId, convertId, enabled = true}) {
  useEffect(() => {
    if (!enabled) return;

    const config = resolveGorgiasConfig({widgetId, convertId});
    if (!config.enabled) return;

    if (config.widgetId && !document.getElementById(GORGIAS_WIDGET_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = GORGIAS_WIDGET_SCRIPT_ID;
      script.src = `https://config.gorgias.chat/bundle-loader/${config.widgetId}`;
      script.async = true;
      document.body.appendChild(script);
    }

    if (config.convertId && !document.getElementById(GORGIAS_CONVERT_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = GORGIAS_CONVERT_SCRIPT_ID;
      script.src = `https://static.9gtb.com/loader.js?g_cvt_id=${config.convertId}`;
      script.async = true;
      document.body.appendChild(script);
    }

    // Intentionally no cleanup — chat must persist across Hydrogen SPA navigations.
  }, [enabled, widgetId, convertId]);

  return null;
}
