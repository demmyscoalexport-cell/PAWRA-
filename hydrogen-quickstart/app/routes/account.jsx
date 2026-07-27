/**
 * @file account.jsx
 * @description Account shell — enterprise soft navigation for Care hub.
 */

import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {buildSeoMeta} from '~/lib/seo';

export function shouldRevalidate() {
  return true;
}

export const meta = () => {
  return buildSeoMeta({
    title: 'Account',
    description: 'Manage your PAWRA account, pets, orders, and rewards.',
    url: '/account',
    robots: {noIndex: true, noFollow: true},
  });
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  /** @type {LoaderReturnData} */
  const {customer} = useLoaderData();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <div className="bg-page-bg px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-1440">
        <h1 className="font-sans text-display-m text-text-primary">{heading}</h1>
        <p className="mt-2 font-sans text-body-m text-text-secondary">
          Orders, pets, pharmacy-ready profiles, and rewards — managed securely with Shopify Customer Accounts.
        </p>
        <AccountMenu />
        <div className="mt-10 rounded-lg border border-border-subtle bg-page-bg p-6 md:p-8">
          <Outlet context={{customer}} />
        </div>
      </div>
    </div>
  );
}

function AccountMenu() {
  const linkClass = ({isActive}) =>
    [
      'border-b px-1 py-2 font-sans text-body-s font-medium no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
      isActive
        ? 'border-text-primary text-text-primary'
        : 'border-transparent text-text-secondary hover:text-text-primary',
    ].join(' ');

  const links = [
    {to: '/account', label: 'Dashboard', end: true},
    {to: '/account/orders', label: 'Orders'},
    {to: '/account/pets', label: 'My Pets'},
    {to: '/account/subscriptions', label: 'Subscriptions'},
    {to: '/account/loyalty', label: 'Loyalty'},
    {to: '/account/registries', label: 'Registries'},
    {to: '/account/notifications', label: 'Notifications'},
    {to: '/account/profile', label: 'Profile'},
    {to: '/account/addresses', label: 'Addresses'},
  ];

  return (
    <nav className="mt-8 flex flex-wrap gap-5" aria-label="Account">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
          {link.label}
        </NavLink>
      ))}
      <Form method="POST" action="/account/logout">
        <button
          type="submit"
          className="border-b border-transparent px-1 py-2 font-sans text-body-s font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          Sign out
        </button>
      </Form>
    </nav>
  );
}

/** @typedef {import('./+types/account').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
