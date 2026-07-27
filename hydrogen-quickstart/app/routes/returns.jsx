/**
 * @file returns.jsx
 * @description Enterprise returns portal — Loop when configured, guided form otherwise.
 */

import {useState} from 'react';
import {Link, useRouteLoaderData} from 'react-router';
import {Button} from '~/components/ui/Button';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Returns',
    description: 'Start a PAWRA return within 30 days. Prepaid labels available.',
    url: '/returns',
  });

export default function ReturnsPage() {
  const rootData = useRouteLoaderData('root');
  const loopReturnsUrl = rootData?.integrations?.loopReturns?.returnsUrl;
  const [done, setDone] = useState(false);

  if (loopReturnsUrl) {
    return (
      <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-display-s text-action-primary">Returns portal</h1>
          <p className="mt-3 font-sans text-body-m text-text-secondary">
            Start a return in our secure returns portal. Most eligible items are covered within 30 days of delivery.
          </p>
          <a
            href={loopReturnsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-action-primary px-8 font-sans text-body-m font-semibold text-action-primary-label no-underline hover:bg-action-primary-hover"
          >
            Open returns portal
          </a>
          <p className="mt-6 font-sans text-body-s text-text-secondary">
            Need help?{' '}
            <Link to="/pages/contact" className="font-medium text-action-primary no-underline hover:underline">
              Contact support
            </Link>{' '}
            or review our{' '}
            <Link to="/policies/refund-policy" className="font-medium text-action-primary no-underline hover:underline">
              refund policy
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="bg-page-bg px-4 py-16 md:px-10">
        <div className="mx-auto max-w-lg rounded-lg border border-border-subtle bg-surface p-8 text-center">
          <h1 className="font-serif text-heading-m text-action-primary">Return requested</h1>
          <p className="mt-3 font-sans text-body-m text-text-secondary">
            We received your request. Check your email for next steps and label details.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="md" href="/track-order">
              Track a package
            </Button>
            <Button variant="secondary" size="md" href="/">
              Back home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-serif text-display-s text-action-primary">Returns portal</h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Most items can be returned within 30 days. Select your order details below — or review our{' '}
          <Link to="/policies/refund-policy" className="font-medium text-action-primary no-underline hover:underline">
            refund policy
          </Link>
          .
        </p>
        <form
          className="mt-8 space-y-4 rounded-lg border border-border-subtle bg-surface p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label className="block font-sans text-body-s text-text-primary">
            Order number
            <input
              name="order"
              required
              className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </label>
          <label className="block font-sans text-body-s text-text-primary">
            Email on the order
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </label>
          <label className="block font-sans text-body-s text-text-primary">
            Item
            <select
              name="item"
              required
              className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <option value="">Select…</option>
              <option>Food or treats</option>
              <option>Gear / apparel</option>
              <option>Beds or furniture</option>
              <option>Pharmacy / wellness</option>
              <option>Other</option>
            </select>
          </label>
          <label className="block font-sans text-body-s text-text-primary">
            Reason
            <select
              name="reason"
              required
              className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <option value="">Select…</option>
              <option>Changed mind</option>
              <option>Wrong item</option>
              <option>Damaged</option>
              <option>Doesn&apos;t fit / pet won&apos;t use</option>
            </select>
          </label>
          <label className="flex items-center gap-2 font-sans text-body-s text-text-primary">
            <input
              type="checkbox"
              name="label"
              defaultChecked
              className="accent-[rgb(var(--color-action-primary))]"
            />
            Request prepaid return label
          </label>
          <Button type="submit" variant="primary" size="md">
            Submit return
          </Button>
        </form>
      </div>
    </div>
  );
}
