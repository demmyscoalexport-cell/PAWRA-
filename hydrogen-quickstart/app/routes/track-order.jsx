/**
 * @file track-order.jsx
 * @description Guest order tracking — demo timeline with enterprise trust framing.
 */

import {useState} from 'react';
import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {TRACK_ORDER_DEMO} from '~/data/platform';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Track Order',
    description: 'Track a PAWRA shipment with your order number and email.',
    url: '/track-order',
  });

export default function TrackOrderPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    setError('');
    const data = new FormData(event.currentTarget);
    const orderNumber = String(data.get('orderNumber') || '').trim();
    const email = String(data.get('email') || '').trim();
    if (!orderNumber || !email) {
      setError('Enter both order number and email to continue.');
      return;
    }
    setResult({...TRACK_ORDER_DEMO, orderNumber, email});
  }

  return (
    <div className="bg-page-bg px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-serif text-display-s text-action-primary">Track your order</h1>
        <p className="mt-3 font-sans text-body-m text-text-secondary">
          Enter the order number from your confirmation email. Signed-in customers can also view orders in{' '}
          <Link to="/account/orders" className="font-medium text-action-primary no-underline hover:underline">
            Account → Orders
          </Link>
          .
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-lg border border-border-subtle bg-surface p-6"
        >
          {error ? (
            <p className="rounded-md border border-sale/40 bg-sale/10 px-3 py-2 font-sans text-body-s text-text-primary" role="alert">
              {error}
            </p>
          ) : null}
          <label className="block font-sans text-body-s text-text-primary">
            Order number
            <input
              name="orderNumber"
              required
              placeholder="e.g. 1042"
              className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </label>
          <label className="block font-sans text-body-s text-text-primary">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-border-subtle bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </label>
          <Button type="submit" variant="primary" size="md">
            Track package
          </Button>
        </form>

        {result ? (
          <div className="mt-10 space-y-6">
            <div className="rounded-lg border border-border-subtle bg-surface p-6">
              <p className="font-sans text-body-m font-semibold text-text-primary">
                Order #{result.orderNumber} · {result.status}
              </p>
              <p className="mt-1 font-mono text-mono-s text-text-secondary">
                {result.carrier} · {result.trackingNumber}
              </p>
              <div className="mt-6 flex h-40 items-center justify-center rounded-md bg-action-secondary font-sans text-body-s text-text-secondary">
                Live map available when carrier tracking is linked
              </div>
              <p className="mt-4 font-sans text-body-xs text-text-secondary">
                Sample shipment timeline for demo. Production tracking uses your carrier feed.
              </p>
            </div>
            <ol className="space-y-4">
              {result.timeline.map((step) => (
                <li key={step.label} className="flex gap-3">
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      step.done ? 'bg-action-primary' : 'bg-border-strong'
                    }`}
                  />
                  <div>
                    <p className="font-sans text-body-s font-medium text-text-primary">{step.label}</p>
                    <p className="font-mono text-mono-s text-text-secondary">{step.date}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="md" href="/returns">
                Start a return
              </Button>
              <Button variant="ghost" size="md" href="/pages/contact">
                Contact support
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
