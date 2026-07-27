/**
 * @file CartDeliveryEstimate.jsx
 * @description Estimated delivery window shown on cart (enterprise CX).
 */

import {getDeliveryEstimateLabel} from '~/lib/commerce';

/**
 * @param {{ className?: string }} props
 */
export function CartDeliveryEstimate({className = ''}) {
  const label = getDeliveryEstimateLabel();

  return (
    <p className={`font-sans text-body-s text-text-secondary ${className}`}>
      Estimated delivery:{' '}
      <span className="font-medium text-text-primary">{label}</span>
    </p>
  );
}
