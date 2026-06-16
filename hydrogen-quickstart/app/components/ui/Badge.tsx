/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file Badge.tsx
 * @description Design system UI primitive: Badge.
 * @author Pawra LLC
 * @website pawrapetshop.com
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
    className: 'bg-electric-jade text-midnight',
  },
  'best-seller': {
    label: 'Best Seller',
    className: 'bg-champagne text-midnight',
  },
  'coming-soon': {
    label: 'Coming Soon',
    className: 'bg-cloud text-ink border border-forest-green/20',
  },
  'walker-approved': {
    label: 'Walker Approved',
    className: 'bg-forest-green text-cloud',
  },
  'care-plan': {
    label: 'Care Plan',
    className: 'bg-forest-night text-electric-jade',
  },
  sale: {
    label: 'Sale',
    className: 'bg-coral text-cloud',
  },
  'in-stock': {
    label: 'In Stock',
    className: 'bg-electric-jade/20 text-forest-green border border-electric-jade',
  },
  'low-stock': {
    label: 'Low Stock',
    className: 'bg-coral/15 text-coral border border-coral/40',
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
