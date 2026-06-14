import {Form, Link} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {Button} from '~/components/ui/Button';

export const meta = () => [{title: 'PAWRA | Sign In'}];

export async function action({request, context}) {
  const url = new URL(request.url);
  return context.customerAccount.login({
    countryCode: context.storefront.i18n.country,
    locale: url.searchParams.get('locale') || undefined,
  });
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-warm-oat px-4 py-16">
      <div className="w-full max-w-md rounded-xl bg-cloud p-8 shadow-card md:p-10">
        <div className="flex justify-center">
          <Logo variant="primary" height={36} />
        </div>
        <h1 className="mt-8 text-center font-serif text-[2.5rem] text-forest-green">Welcome back</h1>
        <Form method="post" className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="font-sans text-body-s font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-forest-green/20 bg-warm-oat px-4 py-3 font-sans text-body-m"
              placeholder="you@example.com"
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
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-forest-green/20 bg-warm-oat px-4 py-3 font-sans text-body-m"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 font-sans text-body-s text-ink/70">
              <input type="checkbox" name="remember" /> Remember me
            </label>
            <Link to="/account/login" className="font-sans text-body-s text-forest-green underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Sign In
          </Button>
        </Form>
        <p className="my-6 text-center font-sans text-body-s text-ink/50">or</p>
        <p className="text-center font-sans text-body-s text-ink/70">
          New to PAWRA?{' '}
          <Link to="/account/register" className="font-semibold text-forest-green underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account_.login').Route} Route */
