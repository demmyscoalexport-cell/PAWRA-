import {JudgemeAllReviewsCount} from '@judgeme/shopify-hydrogen';

/**
 * All Reviews page — Judge.me store-wide reviews (CDN widget + count).
 */
export function JudgeMeAllReviews() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-4 md:px-0">
      <p className="mb-6 font-sans text-body-m text-ink/70">
        <JudgemeAllReviewsCount /> verified reviews from PAWRA customers
      </p>
      <div
        id="judgeme_all_reviews"
        className="jdgm-widget jdgm-all-reviews-page"
        data-auto-install="false"
      />
      <p className="mt-8 font-sans text-body-s text-ink/50">
        Leave a review from any product page — it will show here after publishing.
      </p>
    </div>
  );
}
