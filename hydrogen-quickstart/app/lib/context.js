/**
 * @file context.js
 * @description Hydrogen router context with integration services.
 */

import { createHydrogenContext } from '@shopify/hydrogen';
import { AppSession } from '~/lib/session';
import { CART_QUERY_FRAGMENT } from '~/lib/fragments';
import { getIntegrations } from '~/lib/integrations';

/**
 * @param {Env} env
 */
function createAdditionalContext(env) {
  const integrations = getIntegrations(env);

  return {
    integrations,
    reviews: integrations.judgeMe.apiEnabled
      ? {
          shopDomain: integrations.judgeMe.shopDomain,
          apiToken: integrations.judgeMe.apiToken,
        }
      : null,
    wishlist: integrations.swym.enabled
      ? {
          storeId: integrations.swym.storeId,
          wishlistUrl: integrations.swym.wishlistUrl,
        }
      : null,
    loyalty: integrations.smile.enabled
      ? {
          publishableKey: integrations.smile.publishableKey,
          rewardsUrl: integrations.smile.rewardsUrl,
        }
      : null,
  };
}

/**
 * @param {Request} request
 * @param {Env} env
 * @param {ExecutionContext} executionContext
 */
export async function createHydrogenRouterContext(request, env, executionContext) {
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);

  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const additionalContext = createAdditionalContext(env);

  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      i18n: { language: 'EN', country: 'US' },
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
      },
    },
    additionalContext,
  );

  return hydrogenContext;
}

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
