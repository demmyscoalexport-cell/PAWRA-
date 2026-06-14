import {Form, Link} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {Button} from '~/components/ui/Button';

export const meta = () => [{title: 'PAWRA | Create Account'}];

export async function action({context}) {
  return context.customerAccount.login({
    countryCode: context.storefront.i18n.country,
  });
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-warm-oat px-4 py-16">
      <div className="w-full max-w-md rounded-xl bg-cloud p-8 shadow-card md:p-10">
        <div className="flex justify-center">
          <Logo variant="primary" height={36} />
        </div>
        <h1 className="mt-8 text-center font-serif text-[2.5rem] text-forest-green">
          Create your account
        </h1>
        <Form method="post" className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="font-sans text-body-s font-medium text-ink">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="mt-1 w-full rounded-md border border-forest-green/20 bg-warm-oat px-4 py-3 font-sans text-body-m"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="font-sans text-body-s font-medium text-ink">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="mt-1 w-full rounded-md border border-forest-green/20 bg-warm-oat px-4 py-3 font-sans text-body-m"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="font-sans text-body-s font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 w-full rounded-md border border-forest-green/20 bg-warm-oat px-4 py-3 font-sans text-body-m"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-sans text-body-s font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 w-full rounded-md border border-forest-green/20 bg-warm-oat px-4 py-3 font-sans text-body-m"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="font-sans text-body-s font-medium text-ink">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="mt-1 w-full rounded-md border border-forest-green/20 bg-warm-oat px-4 py-3 font-sans text-body-m"
            />
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Create Account
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
