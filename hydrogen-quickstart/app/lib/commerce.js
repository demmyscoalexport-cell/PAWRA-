/**
 * Commerce constants shared across cart, PDP, and trust messaging.
 * Keep shipping threshold in sync with AnnouncementBar / TrustBar copy.
 */

/** Free US shipping threshold in USD (subtotal before shipping). */
export const FREE_SHIPPING_THRESHOLD_USD = 75;

/**
 * @param {number | string | null | undefined} subtotalAmount
 * @param {number} [thresholdUsd]
 */
export function getFreeShippingProgress(subtotalAmount, thresholdUsd = FREE_SHIPPING_THRESHOLD_USD) {
  const subtotal = Number(subtotalAmount ?? 0);
  const remaining = Math.max(0, thresholdUsd - subtotal);
  const progress = Math.min(100, thresholdUsd > 0 ? (subtotal / thresholdUsd) * 100 : 100);
  return {
    threshold: thresholdUsd,
    subtotal,
    remaining,
    progress,
    qualifies: remaining <= 0,
  };
}
