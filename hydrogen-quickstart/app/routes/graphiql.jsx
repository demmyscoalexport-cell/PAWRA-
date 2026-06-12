import {graphiqlLoader} from '@shopify/hydrogen';

const STOREFRONT_API_VERSION = '2026-04';

/**
 * GraphiQL loader patched to use the local Hydrogen Storefront API proxy
 * instead of mock.shop directly, which fails in the browser due to CORS.
 */
export async function loader(args) {
  const response = await graphiqlLoader(args);
  const origin = new URL(args.request.url).origin;
  const localStorefrontApi = `${origin}/api/${STOREFRONT_API_VERSION}/graphql.json`;

  let html = await response.text();

  html = html.replace(
    /https:\/\/mock\.shop\/api\/[\w-]+\/graphql\.json/g,
    localStorefrontApi,
  );

  const {storefront} = args.context;
  if (storefront) {
    const externalApiUrl = storefront.getApiUrl();
    if (externalApiUrl && externalApiUrl !== localStorefrontApi) {
      html = html.replaceAll(externalApiUrl, localStorefrontApi);
    }
  }

  return new Response(html, {
    status: response.status,
    headers: {'Content-Type': 'text/html; charset=utf-8'},
  });
}
