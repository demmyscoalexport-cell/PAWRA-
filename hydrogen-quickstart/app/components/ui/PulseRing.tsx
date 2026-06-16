/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file PulseRing.tsx
 * @description Design system UI primitive: PulseRing.
 * @author Pawra LLC
 * @website pawrapetshop.com
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
      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-electric-jade opacity-60" />
      <span className="relative inline-flex h-full w-full rounded-full bg-electric-jade shadow-jade-glow" />
    </span>
  );
}
