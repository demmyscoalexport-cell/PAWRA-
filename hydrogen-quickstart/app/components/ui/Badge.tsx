/**
 * @file Badge.tsx
 * @description Merchandising / status badges — coral Sale pill, soft status chips.
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
    className: 'bg-action-primary/10 text-action-primary',
  },
  'best-seller': {
    label: 'Best Seller',
    className: 'bg-accent/15 text-accent',
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
    className: 'bg-accent text-accent-label shadow-sm dark:shadow-none',
  },
  'in-stock': {
    label: 'In Stock',
    className: 'bg-success/10 text-success',
  },
  'low-stock': {
    label: 'Low Stock',
    className: 'bg-warning/15 text-warning',
  },
  'rx-required': {
    label: 'Rx Required',
    className: 'bg-action-primary/10 text-action-primary',
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
        'inline-flex items-center rounded-md px-2.5 py-1 font-sans text-body-xs font-medium tracking-wide',
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
