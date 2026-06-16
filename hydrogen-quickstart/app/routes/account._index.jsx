import {Link, useOutletContext} from 'react-router';
import {Icon} from '~/components/ui/Icon';

export const meta = () => [{title: 'PAWRA | My Account'}];

export default function AccountDashboard() {
  /** @type {{customer: {firstName?: string; lastName?: string; orders?: {nodes?: unknown[]}}}} */
  const {customer} = useOutletContext();

  const name = customer?.firstName || 'there';
  const orderCount = customer?.orders?.nodes?.length ?? 0;

  const cards = [
    {
      title: 'Recent Orders',
      value: `${orderCount} orders`,
      href: '/account/orders',
      icon: 'cart',
    },
    {
      title: 'Saved Addresses',
      value: 'Manage shipping',
      href: '/account/addresses',
      icon: 'user',
    },
    {
      title: 'Wishlist',
      value: '0 items',
      href: '/collections/all',
      icon: 'heart',
    },
    {
      title: 'Help & Support',
      value: 'Contact us',
      href: '/pages/contact',
      icon: 'star',
    },
  ];

  return (
    <div className="bg-warm-oat px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-[2.5rem] text-forest-green">Welcome back, {name}</h1>
        <p className="mt-2 font-sans text-body-m text-ink/70">
          Manage orders, addresses, and your PAWRA devices.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/account/orders" className="font-sans text-body-s font-semibold text-forest-green underline">
            View orders
          </Link>
          <Link to="/account/profile" className="font-sans text-body-s text-forest-green underline">
            Edit profile
          </Link>
          <Link to="/account/addresses" className="font-sans text-body-s text-forest-green underline">
            Addresses
          </Link>
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account._index').Route} Route */
