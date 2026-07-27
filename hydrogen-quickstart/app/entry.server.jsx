/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET CARES               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetcares.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file entry.server.jsx
 * @description Server-side render entry with CSP and streaming HTML.
 * @author Pawra LLC
 * @website pawrapetcares.com
 */

import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import { createContentSecurityPolicy } from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} reactRouterContext
 * @param {HydrogenRouterContextProvider} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
  context
) {
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    // Third-party storefront apps (blocked by Hydrogen CSP unless allowlisted)
    scriptSrc: [
      'https://config.gorgias.chat',
      'https://assets.gorgias.chat',
      // Gorgias Chat bundle loads a Cloudflare polyfill for older browsers
      'https://cdnjs.cloudflare.com',
      'https://static.9gtb.com',
      'https://static.klaviyo.com',
      'https://static-forms.klaviyo.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://js.smile.io',
      'https://cdn.swymrelay.com',
      'https://cdn.judge.me',
    ],
    connectSrc: [
      'https://config.gorgias.chat',
      'https://config.gorgias.io',
      'https://*.gorgias.chat',
      'https://*.gorgias.com',
      'https://*.gorgias.work',
      'wss://*.gorgias.chat',
      'https://cdnjs.cloudflare.com',
      'https://static.9gtb.com',
      'https://storage.googleapis.com',
      'https://*.klaviyo.com',
      'https://a.klaviyo.com',
      'https://static.klaviyo.com',
      'https://www.google-analytics.com',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://www.googletagmanager.com',
      'https://*.smile.io',
      'https://*.swymrelay.com',
      'https://cdn.judge.me',
      'https://api.judge.me',
    ],
    frameSrc: [
      'https://config.gorgias.chat',
      'https://*.gorgias.chat',
      'https://www.googletagmanager.com',
      'https://*.klaviyo.com',
    ],
    imgSrc: [
      "'self'",
      'data:',
      'blob:',
      'https://cdn.shopify.com',
      'https://*.gorgias.chat',
      'https://storage.googleapis.com',
      'https://*.klaviyo.com',
      'https://www.google-analytics.com',
      'https://*.google-analytics.com',
      'https://cdn.judge.me',
      'https://*.smile.io',
    ],
    styleSrc: [
      'https://*.gorgias.chat',
      'https://static.klaviyo.com',
      'https://cdn.judge.me',
      'https://fonts.googleapis.com',
    ],
    fontSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://fonts.gstatic.com',
      'https://*.gorgias.chat',
      'https://static.klaviyo.com',
    ],
    workerSrc: ["'self'", 'blob:', 'https://*.gorgias.chat'],
    mediaSrc: ['https://*.gorgias.chat', 'https://cdn.shopify.com', 'https://res.cloudinary.com'],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter context={reactRouterContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/hydrogen').HydrogenRouterContextProvider} HydrogenRouterContextProvider */
/** @typedef {import('react-router').EntryContext} EntryContext */
