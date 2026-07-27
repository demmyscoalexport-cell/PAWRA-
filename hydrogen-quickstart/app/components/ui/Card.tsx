/**
 * @file Card.tsx
 * @description Soft surface cards — restrained elevation.
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

const BASE = 'rounded-lg bg-surface overflow-hidden';

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
      <article className={`${BASE} transition-shadow duration-base hover:shadow-sm ${className}`}>
        {image && <div className="aspect-square bg-page-bg">{image}</div>}
        <div className="space-y-2 p-4">
          {badge && <Badge type={badge} />}
          {title && <h3 className="font-sans text-body-s font-medium text-text-primary">{title}</h3>}
          {description && <p className="font-sans text-body-s text-text-secondary">{description}</p>}
          {children}
          {action}
        </div>
      </article>
    );
  }

  if (variant === 'product-hero') {
    return (
      <article className={`${BASE} shadow-sm ${className}`}>
        {image && <div className="aspect-[4/3] bg-action-secondary">{image}</div>}
        <div className="space-y-3 bg-surface p-6">
          {badge && <Badge type={badge} />}
          {title && <h3 className="font-serif text-display-m text-text-primary">{title}</h3>}
          {description && <p className="font-sans text-body-m text-text-secondary">{description}</p>}
          {children}
          {action}
        </div>
      </article>
    );
  }

  if (variant === 'feature') {
    return (
      <article className={`${BASE} border border-border-subtle p-6 ${className}`}>
        {title && <h3 className="mb-2 font-sans text-heading-s text-text-primary">{title}</h3>}
        {description && <p className="font-sans text-body-m text-text-secondary">{description}</p>}
        {children}
      </article>
    );
  }

  if (variant === 'stat') {
    return (
      <article className={`${BASE} border border-border-subtle bg-page-bg p-6 text-center ${className}`}>
        {value && <p className="font-mono text-display-m text-action-primary">{value}</p>}
        {title && <p className="mt-2 font-sans text-body-s uppercase tracking-wide text-text-secondary">{title}</p>}
        {description && <p className="mt-1 font-sans text-body-xs text-text-secondary">{description}</p>}
      </article>
    );
  }

  if (variant === 'testimonial') {
    return (
      <article className={`${BASE} border-l-4 border-action-primary p-6 shadow-sm ${className}`}>
        {quote && <p className="font-serif text-heading-s italic text-text-primary">&ldquo;{quote}&rdquo;</p>}
        {author && <p className="mt-4 font-sans text-body-s font-medium text-text-primary">{author}</p>}
        {description && <p className="font-sans text-body-xs text-text-secondary">{description}</p>}
      </article>
    );
  }

  return (
    <article className={`${BASE} bg-inverse p-6 text-text-inverse shadow-sm ${className}`}>
      {badge && <Badge type={badge} />}
      {title && <h3 className="mt-3 font-serif text-heading-m text-focus-ring">{title}</h3>}
      {description && <p className="mt-2 font-sans text-body-m text-text-inverse/80">{description}</p>}
      {children}
      {action && <div className="mt-4">{action}</div>}
    </article>
  );
}
