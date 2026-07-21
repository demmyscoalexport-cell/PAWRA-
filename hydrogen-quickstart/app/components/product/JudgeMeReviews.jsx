import {JudgemeReviewWidget} from '@judgeme/shopify-hydrogen';
import {ProductRating} from '~/components/product/ProductRating';

/**
 * Judge.me review block for Hydrogen PDPs — official widget + optional API summary.
 *
 * @param {{
 *   product: { id?: string; title?: string; handle?: string };
 *   reviews?: {
 *     rating?: number;
 *     count?: number;
 *     reviews?: Array<{ quote: string; name: string; meta: string; rating: number }>;
 *   } | null;
 * }} props
 */
export function JudgeMeReviews({product, reviews}) {
  if (!product?.id) return null;

  const list = reviews?.reviews ?? [];

  return (
    <section id="reviews" className="mt-16 border-t border-forest-green/10 pt-12">
      <div className="mb-6">
        <h2 className="font-serif text-heading-s text-forest-green">Customer reviews</h2>
        <ProductRating rating={reviews?.rating} count={reviews?.count} />
      </div>

      {list.length > 0 && (
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

      <JudgemeReviewWidget id={product.id} />
    </section>
  );
}
