/**
 * @file account._index.jsx
 * @description Account hub dashboard — orders, loyalty, pets, subscriptions.
 */

import {Link, useOutletContext} from 'react-router';
import {Button} from '~/components/ui/Button';
import {LoyaltyProgress} from '~/components/account/LoyaltyProgress';
import {
  MOCK_ACCOUNT_USER,
  MOCK_HEALTH_REMINDERS,
  MOCK_ORDERS_RECENT,
  MOCK_SUBSCRIPTIONS,
} from '~/data/platform';
import {getMockProductByHandle} from '~/data/products';

export const meta = () => [{title: 'PAWRA | My Account'}];

export default function AccountDashboard() {
  const {customer} = useOutletContext() || {};
  const name = customer?.firstName || MOCK_ACCOUNT_USER.name;
  const points = MOCK_ACCOUNT_USER.loyaltyPoints;
  const tier = MOCK_ACCOUNT_USER.tier;
  const reorder = getMockProductByHandle('grain-free-salmon-sweet-potato');

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-heading-m text-text-primary">Welcome back, {name}</h2>
        <p className="mt-2 font-sans text-body-m text-text-secondary">
          Your Care hub — orders, pets, autoship, and rewards in one place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border-subtle bg-page-bg p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-body-m font-semibold text-text-primary">Recent orders</h3>
            <Link to="/account/orders" className="font-sans text-body-s text-action-primary no-underline hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {MOCK_ORDERS_RECENT.map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 rounded-md bg-surface px-4 py-3">
                <div>
                  <p className="font-sans text-body-s font-medium text-text-primary">#{order.id}</p>
                  <p className="font-mono text-mono-s text-text-secondary">
                    {order.date} · {order.items} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-mono-s text-text-primary">{order.total}</p>
                  <p className="font-sans text-body-xs text-success">{order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-border-subtle bg-page-bg p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-body-m font-semibold text-text-primary">Loyalty</h3>
            <Link to="/account/loyalty" className="font-sans text-body-s text-action-primary no-underline hover:underline">
              Rewards
            </Link>
          </div>
          <LoyaltyProgress points={points} tier={tier} thresholds={MOCK_ACCOUNT_USER.tierThresholds} />
        </section>

        <section className="rounded-lg border border-border-subtle bg-page-bg p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-body-m font-semibold text-text-primary">Active subscriptions</h3>
            <Link to="/account/subscriptions" className="font-sans text-body-s text-action-primary no-underline hover:underline">
              Manage
            </Link>
          </div>
          <ul className="space-y-3">
            {MOCK_SUBSCRIPTIONS.map((sub) => (
              <li key={sub.id} className="rounded-md bg-surface px-4 py-3">
                <p className="font-sans text-body-s font-medium text-text-primary">{sub.product}</p>
                <p className="mt-1 font-mono text-mono-s text-text-secondary">
                  Next charge {sub.nextCharge} · Qty {sub.quantity}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-border-subtle bg-page-bg p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-body-m font-semibold text-text-primary">Health reminders</h3>
            <Link to="/account/pets" className="font-sans text-body-s text-action-primary no-underline hover:underline">
              My pets
            </Link>
          </div>
          <ul className="space-y-3">
            {MOCK_HEALTH_REMINDERS.map((item) => (
              <li key={item.id} className="rounded-md bg-surface px-4 py-3">
                <p className="font-sans text-body-s font-medium text-text-primary">
                  {item.petName}: {item.label}
                </p>
                <p className="mt-1 font-mono text-mono-s text-text-secondary">Due {item.date}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {reorder ? (
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-subtle bg-action-secondary/60 px-5 py-4">
          <div>
            <p className="font-sans text-body-s font-semibold text-text-primary">Quick reorder</p>
            <p className="mt-1 font-sans text-body-s text-text-secondary">{reorder.title}</p>
          </div>
          <Button variant="primary" size="md" href={`/products/${reorder.handle}`}>
            Reorder
          </Button>
        </section>
      ) : null}
    </div>
  );
}
