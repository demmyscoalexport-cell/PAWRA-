/**
 * @file account.subscriptions.jsx
 * @description Autoship subscriptions management (mock).
 */

import {useState} from 'react';
import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';
import {MOCK_SUBSCRIPTIONS} from '~/data/platform';
import {buildSeoMeta} from '~/lib/seo';

export const meta = () =>
  buildSeoMeta({
    title: 'Subscriptions',
    url: '/account/subscriptions',
    robots: {noIndex: true, noFollow: true},
  });

export default function AccountSubscriptionsPage() {
  const [subs, setSubs] = useState(MOCK_SUBSCRIPTIONS);

  function updateQty(id, delta) {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === id ? {...s, quantity: Math.max(1, s.quantity + delta)} : s,
      ),
    );
  }

  function skip(id) {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === id ? {...s, nextCharge: '2026-09-12 (skipped once)'} : s,
      ),
    );
  }

  function cancel(id) {
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? {...s, status: 'Cancelled'} : s)),
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-heading-m text-text-primary">Subscriptions</h2>
        <p className="mt-1 font-sans text-body-s text-text-secondary">
          Manage Autoship & Save. Skip, edit quantity, or cancel anytime.
        </p>
      </div>

      <ul className="space-y-4">
        {subs.map((sub) => (
          <li key={sub.id} className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-page-bg p-5 md:flex-row md:items-center">
            <img src={sub.image} alt="" className="h-20 w-20 rounded-md object-cover" loading="lazy" />
            <div className="flex-1">
              <Link to={`/products/${sub.productHandle}`} className="font-sans text-body-m font-semibold text-text-primary no-underline hover:text-action-primary">
                {sub.product}
              </Link>
              <p className="mt-1 font-mono text-mono-s text-text-secondary">
                {sub.frequency} · Next {sub.nextCharge} · {sub.status}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button type="button" className="reset rounded-md border border-border-subtle bg-surface px-3 py-1 font-sans text-body-s" onClick={() => updateQty(sub.id, -1)} aria-label="Decrease quantity">−</button>
                <span className="font-mono text-mono-s text-text-primary">Qty {sub.quantity}</span>
                <button type="button" className="reset rounded-md border border-border-subtle bg-surface px-3 py-1 font-sans text-body-s" onClick={() => updateQty(sub.id, 1)} aria-label="Increase quantity">+</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => skip(sub.id)} disabled={sub.status !== 'Active'}>
                Skip next
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => cancel(sub.id)} disabled={sub.status !== 'Active'}>
                Cancel
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-dashed border-border-strong bg-surface px-5 py-6 text-center">
        <p className="font-sans text-body-m text-text-primary">Add a subscription from any product page</p>
        <p className="mt-1 font-sans text-body-s text-text-secondary">Toggle Autoship & Save on eligible PDPs.</p>
        <Button variant="primary" size="md" href="/collections" className="mt-4">
          Browse products
        </Button>
      </div>
    </div>
  );
}
