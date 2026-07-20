import {Icon} from '~/components/ui/Icon';

/**
 * Star rating display for PDP and cards.
 * @param {{ rating?: number; count?: number; compact?: boolean }} props
 */
export function ProductRating({rating = 0, count = 0, compact = false}) {
  const displayRating = rating > 0 ? rating : null;
  const stars = displayRating ? Math.round(displayRating) : 0;

  if (!displayRating && !count) return null;

  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'mt-3'}`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({length: 5}, (_, i) => (
          <Icon
            key={`star-${i}`}
            name="star"
            size="sm"
            color={i < stars ? 'text-champagne' : 'text-ink/20'}
            className={compact ? '!h-3.5 !w-3.5' : '!h-4 !w-4'}
          />
        ))}
      </div>
      {!compact && (
        <span className="font-mono text-mono-s text-ink/60">
          {displayRating?.toFixed(1)}
          {count > 0 ? ` · ${count} review${count === 1 ? '' : 's'}` : ''}
        </span>
      )}
    </div>
  );
}
