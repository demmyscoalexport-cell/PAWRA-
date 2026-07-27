/**
 * Commerce constants shared across cart, PDP, and trust messaging.
 * Keep shipping threshold in sync with AnnouncementBar / TrustBar copy.
 */

/** Free US shipping threshold in USD (subtotal before shipping). */
export const FREE_SHIPPING_THRESHOLD_USD = 75;

/** Standard ground delivery window (business days). */
export const STANDARD_DELIVERY_MIN_DAYS = 3;
export const STANDARD_DELIVERY_MAX_DAYS = 5;

/** Loyalty earn rate — points per USD subtotal (Smile-compatible estimate). */
export const LOYALTY_POINTS_PER_DOLLAR = 1;

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

/**
 * @param {number | string | null | undefined} subtotalAmount
 * @param {number} [rate]
 */
export function estimateLoyaltyPoints(subtotalAmount, rate = LOYALTY_POINTS_PER_DOLLAR) {
  const subtotal = Number(subtotalAmount ?? 0);
  if (!Number.isFinite(subtotal) || subtotal <= 0) return 0;
  return Math.floor(subtotal * rate);
}

/**
 * Human-readable delivery estimate for US ground shipping.
 * @param {Date} [fromDate]
 */
export function getDeliveryEstimateLabel(fromDate = new Date()) {
  const start = addBusinessDays(fromDate, STANDARD_DELIVERY_MIN_DAYS);
  const end = addBusinessDays(fromDate, STANDARD_DELIVERY_MAX_DAYS);
  const fmt = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'});
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

/**
 * @param {Date} date
 * @param {number} businessDays
 */
function addBusinessDays(date, businessDays) {
  const result = new Date(date);
  let added = 0;
  while (added < businessDays) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return result;
}
