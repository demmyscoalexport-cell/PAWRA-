/**
 * @file PhotoReviews.jsx
 * @description Customer photo review grid for PDP.
 */

import {MOCK_PHOTO_REVIEWS} from '~/data/platform';
import {Icon} from '~/components/ui/Icon';

export function PhotoReviews() {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-heading-s text-text-primary">Customer photos</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {MOCK_PHOTO_REVIEWS.map((review) => (
          <figure key={review.id} className="overflow-hidden rounded-lg border border-border-subtle bg-surface">
            <img src={review.image} alt="" loading="lazy" className="aspect-square w-full object-cover" />
            <figcaption className="space-y-2 p-4">
              <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({length: review.rating}, (_, i) => (
                  <Icon key={i} name="star" size="sm" color="text-accent" className="!h-3.5 !w-3.5" />
                ))}
              </div>
              <p className="font-sans text-body-s text-text-primary">{review.text}</p>
              <p className="font-sans text-body-xs text-text-secondary">{review.author}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
