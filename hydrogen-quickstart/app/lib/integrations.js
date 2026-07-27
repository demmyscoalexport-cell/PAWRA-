import {
  DEFAULT_GORGIAS_CONVERT_ID,
  DEFAULT_GORGIAS_WIDGET_ID,
} from '~/lib/gorgias';

/** Klaviyo Public API Key / Site ID (PAWRA PET SHOP) — safe for client-side use */
export const DEFAULT_KLAVIYO_COMPANY_ID = 'XeFt95';

/** Footer embed form: PAWRA Footer Email Signup */
export const DEFAULT_KLAVIYO_FORM_ID = 'UkZJYH';

/**
 * Third-party app integration config — activated when env vars are set in .env / Oxygen.
 * @param {Env} env
 */
export function getIntegrations(env) {
  const judgeMeShop = env.PUBLIC_JUDGEME_SHOP_DOMAIN || '';
  const judgeMePublic = env.PUBLIC_JUDGEME_PUBLIC_TOKEN || '';
  const judgeMePrivate = env.JUDGEME_API_TOKEN || '';
  const gorgiasWidgetId = env.PUBLIC_GORGIAS_WIDGET_ID || DEFAULT_GORGIAS_WIDGET_ID;
  const gorgiasConvertId = env.PUBLIC_GORGIAS_CONVERT_ID || DEFAULT_GORGIAS_CONVERT_ID;
  const klaviyoCompanyId = env.PUBLIC_KLAVIYO_COMPANY_ID || DEFAULT_KLAVIYO_COMPANY_ID;
  const klaviyoFormId = env.PUBLIC_KLAVIYO_FORM_ID || DEFAULT_KLAVIYO_FORM_ID;

  return {
    judgeMe: {
      // Widgets need shop + public token; API helpers need private token
      enabled: Boolean(judgeMeShop && (judgeMePublic || judgeMePrivate)),
      widgetsEnabled: Boolean(judgeMeShop && judgeMePublic),
      apiEnabled: Boolean(judgeMeShop && judgeMePrivate),
      shopDomain: judgeMeShop,
      apiToken: judgeMePrivate,
      publicToken: judgeMePublic,
      cdnHost: env.PUBLIC_JUDGEME_CDN_HOST || 'https://cdn.judge.me',
    },
    klaviyo: {
      // Public Site ID + embed form ship with defaults so Oxygen works before env mirror
      enabled: Boolean(klaviyoCompanyId),
      companyId: klaviyoCompanyId,
      formId: klaviyoFormId,
    },
    swym: {
      enabled: Boolean(env.PUBLIC_SWYM_STORE_ID),
      storeId: env.PUBLIC_SWYM_STORE_ID || '',
      wishlistUrl: env.PUBLIC_SWYM_WISHLIST_URL || '/pages/wishlist',
    },
    smile: {
      enabled: Boolean(env.PUBLIC_SMILE_PUBLISHABLE_KEY || env.PUBLIC_SMILE_REWARDS_URL),
      publishableKey: env.PUBLIC_SMILE_PUBLISHABLE_KEY || '',
      rewardsUrl: env.PUBLIC_SMILE_REWARDS_URL || '/pages/rewards',
    },
    gorgias: {
      // Public chat IDs ship with defaults so Oxygen works before env mirror
      enabled: Boolean(gorgiasWidgetId || gorgiasConvertId),
      widgetId: gorgiasWidgetId,
      convertId: gorgiasConvertId,
    },
    loopReturns: {
      enabled: Boolean(env.PUBLIC_LOOP_RETURNS_URL),
      returnsUrl: env.PUBLIC_LOOP_RETURNS_URL || '/policies/refund-policy',
    },
    recharge: {
      enabled: Boolean(env.PUBLIC_RECHARGE_STORE_IDENTIFIER),
      storeIdentifier: env.PUBLIC_RECHARGE_STORE_IDENTIFIER || '',
    },
    ga4: {
      enabled: Boolean(env.PUBLIC_GA4_MEASUREMENT_ID),
      measurementId: env.PUBLIC_GA4_MEASUREMENT_ID || '',
    },
  };
}

/** @param {ReturnType<typeof getIntegrations>} integrations */
export function getPublicIntegrations(integrations) {
  return {
    klaviyo: integrations.klaviyo.enabled
      ? {
          companyId: integrations.klaviyo.companyId,
          formId: integrations.klaviyo.formId,
        }
      : null,
    swym: integrations.swym.enabled
      ? {storeId: integrations.swym.storeId, wishlistUrl: integrations.swym.wishlistUrl}
      : null,
    smile: {
      publishableKey: integrations.smile.publishableKey,
      rewardsUrl: integrations.smile.rewardsUrl,
    },
    gorgias: integrations.gorgias.enabled
      ? {
          widgetId: integrations.gorgias.widgetId,
          convertId: integrations.gorgias.convertId,
        }
      : null,
    ga4: integrations.ga4.enabled ? {measurementId: integrations.ga4.measurementId} : null,
    loopReturns: integrations.loopReturns.enabled
      ? {returnsUrl: integrations.loopReturns.returnsUrl}
      : null,
    recharge: integrations.recharge.enabled
      ? {storeIdentifier: integrations.recharge.storeIdentifier}
      : null,
    judgeMe: integrations.judgeMe.widgetsEnabled
      ? {
          shopDomain: integrations.judgeMe.shopDomain,
          publicToken: integrations.judgeMe.publicToken,
          cdnHost: integrations.judgeMe.cdnHost,
        }
      : null,
  };
}
