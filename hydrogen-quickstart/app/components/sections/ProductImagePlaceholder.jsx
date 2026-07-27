/**
 * @file ProductImagePlaceholder.jsx
 * @description Branded studio-style placeholder when a product has no media.
 */

export function ProductImagePlaceholder({label = 'Product', className = '', aspect = 'aspect-square'}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F0E8] to-[#EDE6DA] ${aspect} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage:
          'radial-gradient(circle at 30% 30%, #2EE8A0 0%, transparent 45%), radial-gradient(circle at 80% 70%, #1B3A2D 0%, transparent 40%)',
      }} />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1B3A2D] shadow-md">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="12" r="3.2" fill="#2EE8A0" />
          <circle cx="11" cy="18" r="2.6" fill="#F2F2F0" />
          <circle cx="18" cy="20" r="2.6" fill="#F2F2F0" />
          <circle cx="25" cy="18" r="2.6" fill="#F2F2F0" />
          <ellipse cx="18" cy="26" rx="5.5" ry="4" fill="#F2F2F0" />
        </svg>
      </div>
      <span className="relative mt-4 max-w-[70%] truncate text-center font-sans text-body-xs font-medium tracking-wide text-action-primary/50">
        {label}
      </span>
    </div>
  );
}
