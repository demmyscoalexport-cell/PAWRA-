/**
 * Third-party app integration config — activated when env vars are set in .env / Oxygen.
 * @param {Env} env
 */
export function getIntegrations(env) {
  return {
    judgeMe: {
      enabled: Boolean(env.PUBLIC_JUDGEME_SHOP_DOMAIN && env.JUDGEME_API_TOKEN),
      shopDomain: env.PUBLIC_JUDGEME_SHOP_DOMAIN || '',
      apiToken: env.JUDGEME_API_TOKEN || '',
      publicToken: env.PUBLIC_JUDGEME_PUBLIC_TOKEN || '',
    },
    klaviyo: {
      enabled: Boolean(env.PUBLIC_KLAVIYO_COMPANY_ID),
      companyId: env.PUBLIC_KLAVIYO_COMPANY_ID || '',
    },
    swym: {
      enabled: Boolean(env.PUBLIC_SWYM_STORE_ID),
      storeId: env.PUBLIC_SWYM_STORE_ID || '',
      wishlistUrl: env.PUBLIC_SWYM_WISHLIST_URL || '/account/wishlist',
    },
    smile: {
      enabled: Boolean(env.PUBLIC_SMILE_PUBLISHABLE_KEY || env.PUBLIC_SMILE_REWARDS_URL),
      publishableKey: env.PUBLIC_SMILE_PUBLISHABLE_KEY || '',
      rewardsUrl: env.PUBLIC_SMILE_REWARDS_URL || '/pages/rewards',
    },
    gorgias: {
      enabled: Boolean(env.PUBLIC_GORGIAS_WIDGET_ID),
      widgetId: env.PUBLIC_GORGIAS_WIDGET_ID || '',
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
      ? {companyId: integrations.klaviyo.companyId}
      : null,
    swym: integrations.swym.enabled
      ? {storeId: integrations.swym.storeId, wishlistUrl: integrations.swym.wishlistUrl}
      : null,
    smile: {
      publishableKey: integrations.smile.publishableKey,
      rewardsUrl: integrations.smile.rewardsUrl,
    },
    gorgias: integrations.gorgias.enabled
      ? {widgetId: integrations.gorgias.widgetId}
      : null,
    ga4: integrations.ga4.enabled ? {measurementId: integrations.ga4.measurementId} : null,
    loopReturns: integrations.loopReturns.enabled
      ? {returnsUrl: integrations.loopReturns.returnsUrl}
      : null,
    recharge: integrations.recharge.enabled
      ? {storeIdentifier: integrations.recharge.storeIdentifier}
      : null,
    judgeMe: integrations.judgeMe.enabled
      ? {
          shopDomain: integrations.judgeMe.shopDomain,
          publicToken: integrations.judgeMe.publicToken || null,
        }
      : null,
  };
}
