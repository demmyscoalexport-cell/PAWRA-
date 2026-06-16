/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file server.js
 * @description Oxygen worker entry — routes requests through Hydrogen and React Router 7.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

/**
 * Oxygen / Cloudflare Workers entry point for PAWRA Pet Shop Hydrogen storefront.
 * Wires Hydrogen context, React Router request handling, session cookies, and redirects.
 */
import * as serverBuild from 'virtual:react-router/server-build';
import { createRequestHandler, storefrontRedirect } from '@shopify/hydrogen';
import { createHydrogenRouterContext } from '~/lib/context';

// ─── Worker Fetch Handler ─────────────────────────────────────────────────────

/**
 * Cloudflare Worker module export — handles every incoming HTTP request.
 */
export default {
  /**
   * Main request pipeline: context → React Router → session commit → redirect fallback.
   *
   * @param {Request} request - Incoming HTTP request
   * @param {Env} env - Worker environment bindings
   * @param {ExecutionContext} executionContext - Cloudflare execution context
   * @returns {Promise<Response>}
   */
  async fetch(request, env, executionContext) {
    try {
      // ─── Hydrogen Context ───
      const hydrogenContext = await createHydrogenRouterContext(request, env, executionContext);

      // ─── React Router Handler ───
      const handleRequest = createRequestHandler({
        build: serverBuild,
        mode: process.env.NODE_ENV ?? 'production',
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      // ─── Session Cookie Commit ───
      if (hydrogenContext.session.isPending) {
        response.headers.set('Set-Cookie', await hydrogenContext.session.commit());
      }

      // ─── Storefront Redirect Fallback (404) ───
      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', { status: 500 });
    }
  },
};
