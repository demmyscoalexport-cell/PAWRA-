/**
 * @file PulseRing.tsx
 * @description Soft status indicator — no glow effects.
 */

type PulseRingProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
};

const SIZE_MAP = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-6 w-6',
};

export function PulseRing({size = 'md', className = '', label = 'Live GPS status'}: PulseRingProps) {
  return (
    <span
      className={`relative inline-flex ${SIZE_MAP[size]} ${className}`}
      role="status"
      aria-label={label}
    >
      <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-action-primary/40" />
      <span className="relative inline-flex h-full w-full rounded-full bg-action-primary" />
    </span>
  );
}
