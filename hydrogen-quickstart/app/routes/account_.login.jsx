/**
 * @file account_.login.jsx
 * @description Customer Account API login — Shopify sends a one-time email code.
 */

import {Form, Link, useLoaderData} from 'react-router';
import {PawraLogo} from '~/components/ui/PawraLogo';
import {Button} from '~/components/ui/Button';
import {BRAND} from '~/lib/branding';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Sign In',
    url: '/account/login',
    robots: {noIndex: true, noFollow: true},
  });

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {env} = context;
  const customerAccountConfigured = Boolean(
    env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID && env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
  );

  return {customerAccountConfigured};
}

/**
 * Starts Shopify Customer Account OAuth. Shopify emails a one-time code —
 * this form does not collect or verify a password.
 * @param {Route.ActionArgs} args
 */
export async function action({request, context}) {
  const url = new URL(request.url);
  return context.customerAccount.login({
    countryCode: context.storefront.i18n.country,
    locale: url.searchParams.get('locale') || undefined,
  });
}

export default function LoginPage() {
  const {customerAccountConfigured} = useLoaderData();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-page-bg px-4 py-16">
      <div className="w-full max-w-md rounded-lg bg-surface p-8 shadow-sm md:p-10">
        <div className="flex justify-center">
          <PawraLogo variant="primary" height={36} />
        </div>
        <h1 className="mt-8 text-center font-sans text-[2.5rem] text-text-primary">Welcome back</h1>
        <p className="mt-3 text-center font-sans text-body-m text-text-secondary">
          Sign in with your email. Shopify will send you a one-time code — no password needed.
        </p>

        {!customerAccountConfigured ? (
          <div
            className="mt-8 rounded-md border border-sale/40 bg-sale/10 px-4 py-3 font-sans text-body-s text-text-primary"
            role="alert"
          >
            <p className="font-semibold">Customer login is not configured yet.</p>
            <p className="mt-2 text-text-secondary">
              In Shopify Admin enable <strong>Customer accounts</strong>, then set{' '}
              <code className="font-mono text-mono-s">PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID</code> and{' '}
              <code className="font-mono text-mono-s">PUBLIC_CUSTOMER_ACCOUNT_API_URL</code> on your
              Hydrogen / Oxygen environment (or run <code className="font-mono text-mono-s">npx shopify hydrogen env pull</code>).
            </p>
          </div>
        ) : null}

        <Form method="post" className="mt-8 space-y-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!customerAccountConfigured}
          >
            Continue with email
          </Button>
        </Form>

        <p className="mt-4 text-center font-sans text-body-s text-text-secondary">
          You&apos;ll enter your email on Shopify&apos;s secure sign-in page, then check your inbox for a code.
        </p>

        <details className="mt-6 rounded-md border border-border-subtle bg-page-bg/60 px-4 py-3 text-left">
          <summary className="cursor-pointer font-sans text-body-s font-semibold text-action-primary">
            Not getting a code?
          </summary>
          <ul className="mt-3 list-disc space-y-2 pl-4 font-sans text-body-s text-text-secondary">
            <li>Check spam / promotions for mail from Shopify.</li>
            <li>Enter your email on the Shopify page (not only this PAWRA screen).</li>
            <li>Try another email address or wait 2 minutes and request again.</li>
            <li>
              Store owner: Hydrogen → Customer Account API must list{' '}
              <span className="font-mono text-mono-s">https://pawrapetcares.com/account/authorize</span> as
              Callback URI.
            </li>
          </ul>
        </details>

        <p className="mt-8 text-center font-sans text-body-s text-text-secondary">
          New to {BRAND.name}?{' '}
          <Link to="/account/register" className="font-semibold text-action-primary underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account_.login').Route} Route */
