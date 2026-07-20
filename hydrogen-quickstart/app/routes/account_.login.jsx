/**
 * @file account_.login.jsx
 * @description Customer Account API login — Shopify sends a one-time email code.
 */

import {Form, Link, useLoaderData} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {Button} from '~/components/ui/Button';
import {BRAND} from '~/lib/branding';

export const meta = () => [{title: 'PAWRA | Sign In'}];

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
    <div className="flex min-h-[70vh] items-center justify-center bg-warm-oat px-4 py-16">
      <div className="w-full max-w-md rounded-xl bg-cloud p-8 shadow-card md:p-10">
        <div className="flex justify-center">
          <Logo variant="primary" height={36} />
        </div>
        <h1 className="mt-8 text-center font-serif text-[2.5rem] text-forest-green">Welcome back</h1>
        <p className="mt-3 text-center font-sans text-body-m text-ink/70">
          Sign in with your email. Shopify will send you a one-time code — no password needed.
        </p>

        {!customerAccountConfigured ? (
          <div
            className="mt-8 rounded-md border border-coral/40 bg-coral/10 px-4 py-3 font-sans text-body-s text-ink"
            role="alert"
          >
            <p className="font-semibold">Customer login is not configured yet.</p>
            <p className="mt-2 text-ink/75">
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

        <p className="mt-4 text-center font-sans text-body-s text-ink/55">
          You&apos;ll enter your email on Shopify&apos;s secure sign-in page, then check your inbox for a code.
        </p>

        <p className="mt-8 text-center font-sans text-body-s text-ink/70">
          New to {BRAND.name}?{' '}
          <Link to="/account/register" className="font-semibold text-forest-green underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account_.login').Route} Route */
