/**
 * @file CartTrustStrip.jsx
 * @description Enterprise trust row beside checkout — shipping, returns, security, policies.
 */

import {Link} from 'react-router';
import {Icon} from '~/components/ui/Icon';
import {PaymentBadges} from '~/components/cart/PaymentBadges';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';

/**
 * @param {{
 *   className?: string;
 *   showPayments?: boolean;
 *   loopReturnsUrl?: string | null;
 * }} props
 */
export function CartTrustStrip({className = '', showPayments = true, loopReturnsUrl = null}) {
  const returnsHref = loopReturnsUrl || '/returns';

  return (
    <div className={className}>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <TrustItem icon="truck" label={`Free US shipping over $${FREE_SHIPPING_THRESHOLD_USD}`} />
        <TrustItem icon="check" label="30-day easy returns" />
        <TrustItem icon="shield" label="Secure Shopify checkout" />
      </ul>

      {showPayments ? <PaymentBadges className="mt-4" compact /> : null}

      <nav
        className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-body-xs text-text-secondary"
        aria-label="Checkout policies"
      >
        <Link to="/policies/shipping-policy" className="no-underline hover:text-action-primary hover:underline">
          Shipping
        </Link>
        <span aria-hidden="true">·</span>
        <Link to={returnsHref} className="no-underline hover:text-action-primary hover:underline">
          Returns
        </Link>
        <span aria-hidden="true">·</span>
        <Link to="/policies/privacy-policy" className="no-underline hover:text-action-primary hover:underline">
          Privacy
        </Link>
        <span aria-hidden="true">·</span>
        <Link to="/policies/refund-policy" className="no-underline hover:text-action-primary hover:underline">
          Refunds
        </Link>
      </nav>
      <p className="mt-2 text-center font-sans text-body-xs text-text-secondary">
        Express options (Shop Pay, Apple Pay, Google Pay) appear on the next step when available.
      </p>
    </div>
  );
}

/** @param {{ icon: string; label: string }} props */
function TrustItem({icon, label}) {
  return (
    <li className="flex items-center gap-2 rounded-md border border-border-subtle bg-page-bg/80 px-3 py-2">
      <Icon name={icon} size="sm" color="text-action-primary" />
      <span className="font-sans text-body-xs font-medium text-text-primary">{label}</span>
    </li>
  );
}
