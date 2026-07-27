/**
 * @file PaymentBadges.jsx
 * @description Accepted payment method marks for enterprise trust at checkout.
 */

const BADGES = [
  {id: 'visa', label: 'Visa'},
  {id: 'mastercard', label: 'Mastercard'},
  {id: 'amex', label: 'American Express'},
  {id: 'shop-pay', label: 'Shop Pay'},
  {id: 'apple-pay', label: 'Apple Pay'},
  {id: 'google-pay', label: 'Google Pay'},
];

/**
 * @param {{ className?: string; compact?: boolean }} props
 */
export function PaymentBadges({className = '', compact = false}) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
      aria-label="Accepted payment methods"
    >
      {BADGES.map((badge) => (
        <li
          key={badge.id}
          className={`inline-flex items-center justify-center rounded border border-border-subtle bg-surface font-sans font-semibold uppercase tracking-wide text-text-secondary ${
            compact ? 'h-7 px-2 text-[10px]' : 'h-8 px-2.5 text-[11px]'
          }`}
          title={badge.label}
        >
          <span className="sr-only">{badge.label}</span>
          <span aria-hidden="true">{badgeLabel(badge.id)}</span>
        </li>
      ))}
    </ul>
  );
}

/** @param {string} id */
function badgeLabel(id) {
  switch (id) {
    case 'visa':
      return 'Visa';
    case 'mastercard':
      return 'MC';
    case 'amex':
      return 'Amex';
    case 'shop-pay':
      return 'Shop';
    case 'apple-pay':
      return 'Apple';
    case 'google-pay':
      return 'GPay';
    default:
      return id;
  }
}
