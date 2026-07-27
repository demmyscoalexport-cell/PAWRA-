/**
 * Shared primary CTA classes — deep forest fill, white label.
 * Hover scales slightly for micro-interaction.
 */
export const PRIMARY_CTA_CLASSES = [
  'bg-action-primary text-action-primary-label border border-action-primary',
  'hover:bg-action-primary-hover hover:border-action-primary-hover hover:scale-[1.02]',
  'active:bg-action-primary-hover active:border-action-primary-hover active:scale-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg',
  'transition-all duration-base',
].join(' ');

/** Golden Honey CTA — Add to Cart / urgent actions (both themes). */
export const GOLDEN_CTA_CLASSES = [
  'bg-accent text-accent-label border border-accent',
  'hover:brightness-95 hover:scale-[1.02]',
  'active:brightness-90 active:scale-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg',
  'transition-all duration-base',
].join(' ');

/** Chestnut outline secondary. */
export const SECONDARY_CTA_CLASSES = [
  'bg-transparent text-chestnut border border-chestnut',
  'hover:bg-chestnut/10 hover:scale-[1.02]',
  'active:bg-chestnut/15 active:scale-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg',
  'transition-all duration-base',
].join(' ');
