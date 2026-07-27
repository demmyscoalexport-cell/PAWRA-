/**
 * @file CartLoyaltyHint.jsx
 * @description Estimated rewards points earn on cart subtotal (Smile / PAWRA Rewards).
 */

import {Link, useRouteLoaderData} from 'react-router';
import {estimateLoyaltyPoints} from '~/lib/commerce';

/**
 * @param {{
 *   subtotalAmount?: { amount: string; currencyCode: string } | null;
 *   className?: string;
 * }} props
 */
export function CartLoyaltyHint({subtotalAmount, className = ''}) {
  const rootData = useRouteLoaderData('root');
  const rewardsUrl = rootData?.integrations?.smile?.rewardsUrl || '/pages/rewards';
  const points = estimateLoyaltyPoints(subtotalAmount?.amount);

  if (points <= 0) return null;

  return (
    <div className={`rounded-md border border-action-primary/15 bg-action-primary/5 px-3 py-3 ${className}`}>
      <p className="font-sans text-body-s text-text-primary">
        You&apos;ll earn about{' '}
        <span className="font-semibold text-action-primary">{points.toLocaleString()} points</span>{' '}
        with PAWRA Rewards on this order.
      </p>
      <Link
        to={rewardsUrl}
        className="mt-1 inline-block font-sans text-body-xs font-medium text-action-primary no-underline hover:underline"
      >
        Learn about rewards →
      </Link>
    </div>
  );
}
