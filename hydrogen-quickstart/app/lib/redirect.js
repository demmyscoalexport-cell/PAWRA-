/**
 * @file redirect.js
 * @description Localized handle redirects for SEO-safe canonical URLs.
 */

import {redirect} from 'react-router';

/**
 * If the URL handle doesn't match Shopify's canonical handle, 301 redirect.
 * @param {Request} request
 * @param {...Array<{
 *     handle: string;
 *     data: {handle: string} & unknown;
 *   }>} [localizedResources]
 */
export function redirectIfHandleIsLocalized(request, ...localizedResources) {
  const url = new URL(request.url);
  let shouldRedirect = false;

  localizedResources.forEach(({handle, data}) => {
    if (handle !== data.handle) {
      url.pathname = url.pathname.replace(handle, data.handle);
      shouldRedirect = true;
    }
  });

  if (shouldRedirect) {
    // Permanent redirect preserves SEO equity for renamed handles
    throw redirect(url.toString(), 301);
  }
}
