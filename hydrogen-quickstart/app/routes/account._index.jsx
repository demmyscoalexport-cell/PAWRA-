/**
 * @file account._index.jsx
 * @description Account dashboard with orders, wishlist, and loyalty shortcuts.
 */

import {Link, useOutletContext, useRouteLoaderData} from 'react-router';
import {Icon} from '~/components/ui/Icon';

export const meta = () => [{title: 'PAWRA | My Account'}];

export default function AccountDashboard() {
  /** @type {{customer: {firstName?: string; orders?: {nodes?: unknown[]}}}} */
  const {customer} = useOutletContext();
  /** @type {{ integrations?: { swym?: { wishlistUrl?: string }; smile?: { rewardsUrl?: string } } } | undefined} */
  const rootData = useRouteLoaderData('root');

  const name = customer?.firstName || 'there';
  const orderCount = customer?.orders?.nodes?.length ?? 0;
  const wishlistUrl = rootData?.integrations?.swym?.wishlistUrl || '/pages/wishlist';
  const rewardsUrl = rootData?.integrations?.smile?.rewardsUrl || '/pages/rewards';

  const cards = [
    {title: 'Recent Orders', value: `${orderCount} orders`, href: '/account/orders', icon: 'cart'},
    {title: 'Saved Addresses', value: 'Manage shipping', href: '/account/addresses', icon: 'user'},
    {title: 'Wishlist', value: 'Saved products', href: wishlistUrl, icon: 'heart'},
    {title: 'PAWRA Rewards', value: 'Earn points', href: rewardsUrl, icon: 'star'},
    {title: 'Subscribe & Save', value: 'Autoship essentials', href: '/pages/subscribe-and-save', icon: 'leaf'},
    {title: 'Help & Support', value: 'Contact us', href: '/pages/contact', icon: 'shield'},
  ];

  return (
    <div className="bg-warm-oat px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-[2.5rem] text-forest-green">Welcome back, {name}</h1>
        <p className="mt-2 font-sans text-body-m text-ink/70">
          Manage orders, saved products, and your PAWRA rewards.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="rounded-xl bg-cloud p-6 shadow-card no-underline transition-shadow hover:shadow-md"
            >
              <Icon name={card.icon} size="lg" color="text-forest-green" />
              <h2 className="mt-4 font-sans text-body-m font-semibold text-ink">{card.title}</h2>
              <p className="mt-1 font-mono text-mono-s text-ink/60">{card.value}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account._index').Route} Route */
