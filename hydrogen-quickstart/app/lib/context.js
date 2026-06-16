/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file context.js
 * @description Storefront utility module: context.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import { createHydrogenContext } from '@shopify/hydrogen';
import { AppSession } from '~/lib/session';
import { CART_QUERY_FRAGMENT } from '~/lib/fragments';

// ─── Additional Context ───────────────────────────────────────────────────────

/**
 * Extension point for custom services injected into every route loader/action.
 * Available as `context.propertyName` and via `context.get(propertyContext)`.
 */
const additionalContext = {
  // TODO: Wire reviews provider (e.g. Judge.me, Yotpo) for product ratings
  // reviews: await createReviewsClient(env),

  // TODO: Integrate wishlist SDK for saved products across sessions
  // wishlist: await createWishlistClient(env),

  // TODO: Connect loyalty/rewards program for repeat customers
  // loyalty: await createLoyaltyClient(env),
};

// ─── Hydrogen Router Context ────────────────────────────────────────────────────

/**
 * Bootstraps Hydrogen context for React Router 7 on Oxygen/Workers.
 * Initializes cache, session, storefront client, cart, and i18n defaults.
 *
 * @param {Request} request - Incoming HTTP request
 * @param {Env} env - Worker environment bindings (Shopify tokens, secrets)
 * @param {ExecutionContext} executionContext - Cloudflare execution context for waitUntil
 * @returns {Promise<import('@shopify/hydrogen').HydrogenRouterContextProvider>}
 */
export async function createHydrogenRouterContext(request, env, executionContext) {
  // ─── Environment Validation ───
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);

  // ─── Cache & Session ───
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  // ─── Hydrogen Context Assembly ───
  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      // Or detect from URL path based on locale subpath, cookies, or any other strategy
      i18n: { language: 'EN', country: 'US' },
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
      },
    },
    additionalContext,
  );

  return hydrogenContext;
}

/** @typedef {Class<additionalContext>} AdditionalContextType */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
