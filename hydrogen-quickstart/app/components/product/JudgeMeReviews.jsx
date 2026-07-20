import {ProductRating} from '~/components/product/ProductRating';

/**
 * Judge.me review block for Hydrogen PDPs.
 * Renders API reviews as a readable fallback and mounts the official widget
 * for Write a review + full Judge.me UI (hydrated by widget_preloader.js).
 *
 * @param {{
 *   product: { id?: string; title?: string; handle?: string };
 *   reviews?: {
 *     rating?: number;
 *     count?: number;
 *     reviews?: Array<{ quote: string; name: string; meta: string; rating: number }>;
 *     widgetHtml?: string;
 *     productId?: string;
 *   } | null;
 *   shopDomain?: string;
 * }} props
 */
export function JudgeMeReviews({product, reviews, shopDomain}) {
  const productId =
    reviews?.productId ||
    (typeof product?.id === 'string'
      ? product.id.match(/Product\/(\d+)/)?.[1] ?? ''
      : '');
  const list = reviews?.reviews ?? [];
  const hasApiReviews = list.length > 0;
  const widgetHtml = reviews?.widgetHtml || '';

  if (!shopDomain && !hasApiReviews && !widgetHtml) {
    return null;
  }

  return (
    <section id="reviews" className="mt-16 border-t border-forest-green/10 pt-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-heading-s text-forest-green">Customer reviews</h2>
          <ProductRating rating={reviews?.rating} count={reviews?.count} />
        </div>
      </div>

      {hasApiReviews && (
        <ul className="mb-10 space-y-6">
          {list.map((review, index) => (
            <li
              key={`${review.name}-${index}`}
              className="rounded-lg border border-forest-green/10 bg-cloud/40 p-5"
            >
              <ProductRating rating={review.rating} count={0} compact />
              <p className="mt-3 font-serif text-body-l italic text-ink">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-3 font-sans text-body-s font-semibold text-forest-green">
                {review.name}
                <span className="font-normal text-ink/50"> · {review.meta}</span>
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Official Judge.me widget mount — Write a review + full widget UI */}
      {shopDomain && productId ? (
        widgetHtml ? (
          <div
            id="judgeme_product_reviews"
            className="jdgm-widget jdgm-review-widget"
            data-id={productId}
            data-product-title={product.title || ''}
            data-auto-install="false"
            dangerouslySetInnerHTML={{__html: widgetHtml}}
          />
        ) : (
          <div
            id="judgeme_product_reviews"
            className="jdgm-widget jdgm-review-widget"
            data-id={productId}
            data-product-title={product.title || ''}
            data-auto-install="false"
          />
        )
      ) : null}

      {!hasApiReviews && !widgetHtml && (
        <p className="font-sans text-body-m text-ink/60">
          No reviews yet. Be the first to share feedback on this product.
        </p>
      )}
    </section>
  );
}
