/**
 * Shared primary CTA Tailwind classes — emerald #10B981 with WCAG AA label contrast.
 * Label uses midnight (#0E1A15) on emerald bg (~7.4:1). White on #10B981 fails AA (~2.8:1).
 */
export const PRIMARY_CTA_CLASSES = [
  'bg-cta-primary text-midnight border border-cta-primary shadow-xs',
  'hover:bg-cta-primary-hover hover:border-cta-primary-hover',
  'active:bg-cta-primary-active active:border-cta-primary-active',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta-primary focus-visible:ring-offset-2 focus-visible:ring-offset-warm-oat',
].join(' ');
