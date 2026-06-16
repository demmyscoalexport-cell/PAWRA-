/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file Card.tsx
 * @description Design system UI primitive: Card.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import type {ReactNode} from 'react';
import {Badge, type BadgeType} from './Badge';

export type CardVariant =
  | 'product'
  | 'product-hero'
  | 'feature'
  | 'stat'
  | 'testimonial'
  | 'walker-program';

type CardProps = {
  variant: CardVariant;
  title?: string;
  description?: string;
  value?: string;
  quote?: string;
  author?: string;
  badge?: BadgeType;
  image?: ReactNode;
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
};

const BASE = 'rounded-xl bg-cloud overflow-hidden';

export function Card({
  variant,
  title,
  description,
  value,
  quote,
  author,
  badge,
  image,
  action,
  className = '',
  children,
}: CardProps) {
  if (variant === 'product') {
    return (
      <article className={`${BASE} shadow-card ${className}`}>
        {image && <div className="aspect-square bg-warm-oat">{image}</div>}
        <div className="space-y-2 p-4">
          {badge && <Badge type={badge} />}
          {title && <h3 className="font-serif text-heading-xs text-forest-green">{title}</h3>}
          {description && <p className="font-sans text-body-s text-ink/70">{description}</p>}
          {children}
          {action}
        </div>
      </article>
    );
  }

  if (variant === 'product-hero') {
    return (
      <article className={`${BASE} shadow-elevated ${className}`}>
        {image && <div className="aspect-[4/3] bg-forest-night">{image}</div>}
        <div className="space-y-3 bg-forest-green p-6 text-cloud">
          {badge && <Badge type={badge} />}
          {title && <h3 className="font-serif text-heading-l">{title}</h3>}
          {description && <p className="font-sans text-body-m text-cloud/80">{description}</p>}
          {children}
          {action}
        </div>
      </article>
    );
  }

  if (variant === 'feature') {
    return (
      <article className={`${BASE} border border-forest-green/10 p-6 shadow-sm ${className}`}>
        {title && <h3 className="mb-2 font-serif text-heading-s text-forest-green">{title}</h3>}
        {description && <p className="font-sans text-body-m text-ink/75">{description}</p>}
        {children}
      </article>
    );
  }

  if (variant === 'stat') {
    return (
      <article className={`${BASE} border border-electric-jade/30 bg-warm-oat p-6 text-center shadow-jade-glow ${className}`}>
        {value && <p className="font-mono text-display-s text-forest-green">{value}</p>}
        {title && <p className="mt-2 font-sans text-body-s uppercase tracking-wide text-ink/60">{title}</p>}
        {description && <p className="mt-1 font-sans text-body-xs text-ink/50">{description}</p>}
      </article>
    );
  }

  if (variant === 'testimonial') {
    return (
      <article className={`${BASE} border-l-4 border-electric-jade p-6 shadow-card ${className}`}>
        {quote && <p className="font-serif text-heading-xs italic text-forest-green">&ldquo;{quote}&rdquo;</p>}
        {author && <p className="mt-4 font-sans text-body-s font-medium text-ink">{author}</p>}
        {description && <p className="font-sans text-body-xs text-ink/60">{description}</p>}
      </article>
    );
  }

  return (
    <article className={`${BASE} bg-forest-night p-6 text-cloud shadow-elevated ${className}`}>
      {badge && <Badge type={badge} />}
      {title && <h3 className="mt-3 font-serif text-heading-m text-electric-jade">{title}</h3>}
      {description && <p className="mt-2 font-sans text-body-m text-cloud/80">{description}</p>}
      {children}
      {action && <div className="mt-4">{action}</div>}
    </article>
  );
}
