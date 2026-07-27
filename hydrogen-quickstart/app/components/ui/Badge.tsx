/**
 * @file Badge.tsx
 * @description Subtle merchandising / status badges.
 */

export type BadgeType =
  | 'new'
  | 'best-seller'
  | 'coming-soon'
  | 'walker-approved'
  | 'care-plan'
  | 'sale'
  | 'in-stock'
  | 'low-stock';

const BADGE_CONFIG: Record<
  BadgeType,
  {label: string; className: string}
> = {
  new: {
    label: 'New',
    className: 'bg-action-primary/10 text-action-primary',
  },
  'best-seller': {
    label: 'Best Seller',
    className: 'bg-accent/10 text-accent',
  },
  'coming-soon': {
    label: 'Coming Soon',
    className: 'bg-action-secondary text-text-secondary border border-border-subtle',
  },
  'walker-approved': {
    label: 'Walker Approved',
    className: 'bg-action-primary/10 text-action-primary',
  },
  'care-plan': {
    label: 'Care Plan',
    className: 'bg-action-secondary text-text-primary border border-border-subtle',
  },
  sale: {
    label: 'Sale',
    className: 'bg-sale/10 text-sale',
  },
  'in-stock': {
    label: 'In Stock',
    className: 'bg-success/10 text-success',
  },
  'low-stock': {
    label: 'Low Stock',
    className: 'bg-warning/10 text-warning',
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
        'inline-flex items-center rounded-pill px-3 py-1 font-sans text-body-xs font-medium uppercase tracking-wide',
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
