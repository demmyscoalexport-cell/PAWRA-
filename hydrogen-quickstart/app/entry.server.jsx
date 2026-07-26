/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file entry.server.jsx
 * @description Server-side render entry with CSP and streaming HTML.
 * @author Pawra LLC
 * @website pawrapetshop.com
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
    // Gorgias Chat v3 + Convert campaign bundle (Hydrogen CSP blocks these otherwise)
    scriptSrc: [
      'https://config.gorgias.chat',
      'https://assets.gorgias.chat',
      'https://static.9gtb.com',
    ],
    connectSrc: [
      'https://config.gorgias.chat',
      'https://config.gorgias.io',
      'https://*.gorgias.chat',
      'https://*.gorgias.com',
      'https://*.gorgias.work',
      'wss://*.gorgias.chat',
      'https://static.9gtb.com',
      'https://storage.googleapis.com',
    ],
    frameSrc: ['https://config.gorgias.chat', 'https://*.gorgias.chat'],
    imgSrc: [
      "'self'",
      'data:',
      'blob:',
      'https://cdn.shopify.com',
      'https://*.gorgias.chat',
      'https://storage.googleapis.com',
    ],
    styleSrc: ['https://*.gorgias.chat'],
    fontSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://fonts.gstatic.com',
      'https://*.gorgias.chat',
    ],
    workerSrc: ["'self'", 'blob:', 'https://*.gorgias.chat'],
    mediaSrc: ['https://*.gorgias.chat'],
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
