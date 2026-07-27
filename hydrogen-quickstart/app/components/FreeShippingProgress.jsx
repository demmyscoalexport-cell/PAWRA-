import {Money} from '@shopify/hydrogen';
import {FREE_SHIPPING_THRESHOLD_USD, getFreeShippingProgress} from '~/lib/commerce';

/**
 * Cart free-shipping meter — Chewy-style progress toward free delivery.
 * @param {{
 *   subtotalAmount?: { amount: string; currencyCode: string } | null;
 *   className?: string;
 * }} props
 */
export function FreeShippingProgress({subtotalAmount, className = ''}) {
  const {remaining, progress, qualifies, threshold} = getFreeShippingProgress(
    subtotalAmount?.amount,
    FREE_SHIPPING_THRESHOLD_USD,
  );

  const currencyCode = subtotalAmount?.currencyCode || 'USD';

  return (
    <div className={`rounded-md border border-border-subtle bg-page-bg/80 px-3 py-3 ${className}`}>
      <p className="font-sans text-body-s font-medium text-text-primary">
        {qualifies ? (
          <>You&apos;ve unlocked <span className="text-action-primary">free shipping</span>!</>
        ) : (
          <>
            Add{' '}
            <span className="font-mono text-action-primary">
              <Money data={{amount: remaining.toFixed(2), currencyCode}} />
            </span>{' '}
            more for free shipping
          </>
        )}
      </p>
      <div
        className="mt-2 h-2 overflow-hidden rounded-pill bg-action-primary/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label={`Free shipping progress toward $${threshold}`}
      >
        <div
          className="h-full rounded-pill bg-action-primary transition-[width] duration-300 ease-out"
          style={{width: `${progress}%`}}
        />
      </div>
      <p className="mt-1.5 font-sans text-body-s text-text-secondary">
        Free US shipping on orders over ${threshold}
      </p>
    </div>
  );
}
