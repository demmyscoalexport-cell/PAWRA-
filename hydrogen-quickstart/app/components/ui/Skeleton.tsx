/**
 * @file Skeleton.tsx
 * @description Soft loading placeholders for product cards and panels.
 */

type SkeletonProps = {
  className?: string;
  variant?: 'card' | 'line' | 'avatar' | 'panel';
};

export function Skeleton({className = '', variant = 'line'}: SkeletonProps) {
  const base = 'animate-pulse rounded-md bg-action-secondary';

  if (variant === 'card') {
    return (
      <div className={`overflow-hidden rounded-lg bg-surface ${className}`} aria-hidden="true">
        <div className={`${base} aspect-square rounded-none`} />
        <div className="space-y-3 p-4">
          <div className={`${base} h-4 w-[75%]`} />
          <div className={`${base} h-3 w-1/2`} />
          <div className={`${base} h-8 w-full`} />
        </div>
      </div>
    );
  }

  if (variant === 'avatar') {
    return <div className={`${base} h-12 w-12 rounded-full ${className}`} aria-hidden="true" />;
  }

  if (variant === 'panel') {
    return (
      <div className={`space-y-3 rounded-lg border border-border-subtle bg-surface p-6 ${className}`} aria-hidden="true">
        <div className={`${base} h-6 w-1/3`} />
        <div className={`${base} h-4 w-full`} />
        <div className={`${base} h-4 w-[83%]`} />
        <div className={`${base} h-24 w-full`} />
      </div>
    );
  }

  return <div className={`${base} h-4 w-full ${className}`} aria-hidden="true" />;
}
