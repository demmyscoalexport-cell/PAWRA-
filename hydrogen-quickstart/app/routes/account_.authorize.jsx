/**
 * @file account_.authorize.jsx
 * @description Completes Customer Account OAuth after Shopify email login.
 */

import {Link} from 'react-router';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  try {
    return await context.customerAccount.authorize();
  } catch (error) {
    console.error('[PAWRA] Customer Account authorize failed:', error);
    throw error;
  }
}

/**
 * Shown when authorize throws (e.g. redirect_uri mismatch, bad state).
 */
export function ErrorBoundary() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-warm-oat px-4 py-16">
      <div className="w-full max-w-lg rounded-xl bg-cloud p-8 shadow-card text-center">
        <h1 className="font-serif text-[2rem] text-forest-green">Sign-in couldn&apos;t finish</h1>
        <p className="mt-4 font-sans text-body-m text-ink/70">
          Shopify didn&apos;t complete the return to PAWRA. This is usually a Callback URI mismatch
          in Hydrogen → Customer Account API settings.
        </p>
        <p className="mt-3 font-sans text-body-s text-ink/60">
          Confirm Callback URI includes{' '}
          <code className="font-mono text-mono-s">https://pawrapetcares.com/account/authorize</code>
        </p>
        <Link
          to="/account/login"
          className="mt-8 inline-flex rounded-md bg-forest-green px-5 py-3 font-sans text-body-s font-semibold text-cloud no-underline"
        >
          Try sign-in again
        </Link>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account_.authorize').Route} Route */
