/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file root.jsx
 * @description Root layout, global loaders, analytics, and document shell.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import { Analytics, getShopAnalytics, useNonce } from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import favicon from './assets/favicon.svg?url';
import { FOOTER_QUERY, HEADER_QUERY } from '~/lib/fragments';
import resetStyles from './styles/reset.css?url';
import tailwindStyles from './styles/tailwind.css?url';
import appStyles from './styles/app.css?url';
import { PageLayout } from './components/PageLayout';
import { PawraNotFound } from '~/components/PawraNotFound';
import { ThirdPartyScripts } from '~/components/integrations/ThirdPartyScripts';
import { getIntegrations, getPublicIntegrations } from '~/lib/integrations';

// ─── Revalidation Strategy ────────────────────────────────────────────────────

/**
 * Controls when root loader data is refetched on client navigations.
 * Skips revalidation on GET navigations to avoid redundant header/cart fetches.
 * @type {ShouldRevalidateFunction}
 */
export const shouldRevalidate = ({ formMethod, currentUrl, nextUrl }) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

// ─── Document Head Links ──────────────────────────────────────────────────────

/**
 * Registers global fonts, CDN preconnects, and favicon.
 * Stylesheets are loaded in Layout to avoid dev HMR insertBefore errors.
 * @returns {Array<import('react-router').LinkDescriptor>}
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      // display=swap keeps text visible while webfonts load
    },
    {rel: 'dns-prefetch', href: 'https://cdn.judge.me'},
    {rel: 'dns-prefetch', href: 'https://static.klaviyo.com'},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
}

// ─── Root Loader ──────────────────────────────────────────────────────────────

/**
 * Root route loader — fetches header (critical), defers footer/cart/auth.
 * Also exposes analytics consent config and public store domain.
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const { storefront, env } = args.context;
  const integrations = getPublicIntegrations(getIntegrations(env));

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    integrations,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

// ─── Critical Data (Above the Fold) ───────────────────────────────────────────

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context }) {
  const { storefront } = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return { header };
}

// ─── Deferred Data (Below the Fold) ───────────────────────────────────────────

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  const { storefront, customerAccount, cart } = context;

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

// ─── HTML Shell ───────────────────────────────────────────────────────────────

/**
 * Document shell wrapping every route — head assets, nonce, and outlet slot.
 * @param {{children?: React.ReactNode}} props
 */
export function Layout({ children }) {
  const nonce = useNonce();
  /** @type {RootLoader | undefined} */
  const data = useRouteLoaderData('root');

  return (
    <html lang="en">
      <head>
        {/* ─── Global Stylesheets ─── */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={tailwindStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ThirdPartyScripts integrations={data?.integrations} />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

/**
 * Root application component — wraps routes in analytics and shared PageLayout.
 * Falls back to bare Outlet when loader data is unavailable (e.g. error routes).
 */
export default function App() {
  /** @type {RootLoader} */
  const data = useRouteLoaderData('root');

  if (!data) {
    return <Outlet />;
  }

  return (
    <Analytics.Provider cart={data.cart} shop={data.shop} consent={data.consent}>
      <PageLayout {...data}>
        <Outlet />
      </PageLayout>
    </Analytics.Provider>
  );
}

// ─── Error Boundary ───────────────────────────────────────────────────────────

/**
 * Global error boundary for unhandled route and loader failures.
 * Renders HTTP status and message for debugging in development.
 */
export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (errorStatus === 404) {
    return <PawraNotFound />;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}

/** @typedef {LoaderReturnData} RootLoader */

/** @typedef {import('react-router').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('./+types/root').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
