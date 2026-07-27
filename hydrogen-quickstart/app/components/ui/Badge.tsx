/**
 * @file Badge.tsx
 * @description Minimal text-style merchandising badges.
 */

export type BadgeType =
  | 'new'
  | 'best-seller'
  | 'coming-soon'
  | 'walker-approved'
  | 'care-plan'
  | 'sale'
  | 'in-stock'
  | 'low-stock'
  | 'rx-required';

const BADGE_CONFIG: Record<
  BadgeType,
  {label: string; className: string}
> = {
  new: {
    label: 'New',
    className: 'text-text-primary border-l border-text-primary pl-2',
  },
  'best-seller': {
    label: 'Bestseller',
    className: 'text-accent border-l border-accent pl-2',
  },
  'coming-soon': {
    label: 'Coming soon',
    className: 'text-text-secondary border-l border-border-subtle pl-2',
  },
  'walker-approved': {
    label: 'Walker approved',
    className: 'text-text-primary border-l border-text-primary pl-2',
  },
  'care-plan': {
    label: 'Care plan',
    className: 'text-text-secondary border-l border-border-subtle pl-2',
  },
  sale: {
    label: 'Sale',
    className: 'text-sale border-l border-sale pl-2',
  },
  'in-stock': {
    label: 'In stock',
    className: 'text-success border-l border-success pl-2',
  },
  'low-stock': {
    label: 'Low stock',
    className: 'text-warning border-l border-warning pl-2',
  },
  'rx-required': {
    label: 'Rx required',
    className: 'text-accent border-l border-accent pl-2',
  },
};

type BadgeProps = {
  type: BadgeType;
  className?: string;
};

export function Badge({type, className = ''}: BadgeProps) {
  const config = BADGE_CONFIG[type];

  return (
    <span
      className={[
        'inline-flex items-center font-sans text-body-xs font-medium tracking-wide',
        config.className,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {config.label}
    </span>
  );
}
