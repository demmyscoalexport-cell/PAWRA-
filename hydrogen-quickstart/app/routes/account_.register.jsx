/**
 * @file account_.register.jsx
 * @description Customer Account API registration — same Shopify email OTP flow as login.
 */

import {Form, Link, useLoaderData} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {Button} from '~/components/ui/Button';
import {BRAND} from '~/lib/branding';

export const meta = () => [{title: 'PAWRA | Create Account'}];

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
 * New Customer Accounts uses the same OAuth entry as login.
 * @param {Route.ActionArgs} args
 */
export async function action({context}) {
  return context.customerAccount.login({
    countryCode: context.storefront.i18n.country,
  });
}

export default function RegisterPage() {
  const {customerAccountConfigured} = useLoaderData();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-warm-oat px-4 py-16">
      <div className="w-full max-w-md rounded-xl bg-cloud p-8 shadow-card md:p-10">
        <div className="flex justify-center">
          <Logo variant="primary" height={36} />
        </div>
        <h1 className="mt-8 text-center font-serif text-[2.5rem] text-forest-green">
          Create your account
        </h1>
        <p className="mt-3 text-center font-sans text-body-m text-ink/70">
          Use your email to join {BRAND.name}. Shopify sends a one-time code — no password to remember.
        </p>

        {!customerAccountConfigured ? (
          <div
            className="mt-8 rounded-md border border-coral/40 bg-coral/10 px-4 py-3 font-sans text-body-s text-ink"
            role="alert"
          >
            <p className="font-semibold">Account signup is not configured yet.</p>
            <p className="mt-2 text-ink/75">
              Enable Customer accounts in Shopify Admin and set the Customer Account API env vars on Oxygen.
            </p>
          </div>
        ) : null}

        <Form method="post" className="mt-8">
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

        <p className="mt-6 text-center font-sans text-body-s text-ink/70">
          Already have an account?{' '}
          <Link to="/account/login" className="font-semibold text-forest-green underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account_.register').Route} Route */
