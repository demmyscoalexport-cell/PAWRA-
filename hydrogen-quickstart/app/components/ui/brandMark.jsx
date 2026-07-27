/**
 * Shared PAWRA brand mark geometry — abstract paw × leaf.
 * Fills via currentColor; hex constants for SVG strokes.
 */

export const BRAND_FOREST = '#2C4A3E';
export const BRAND_INK = '#1E1E1E';
/** @deprecated Prefer BRAND_FOREST — kept for import compatibility */
export const BRAND_TEAL = '#2C4A3E';
/** @deprecated Prefer BRAND_FOREST */
export const BRAND_BLACK = '#2C4A3E';
export const BRAND_STONE = '#FDFBF7';
export const BRAND_WHITE = '#FFFFFF';
export const BRAND_ACCENT = '#E8A538';
export const BRAND_CORAL = '#E8A538';
export const BRAND_JADE = '#E8A538';
export const BRAND_CHESTNUT = '#8B5A3C';

/**
 * Icon mark paths (paw pad + toes + leaf accent).
 */
export function BrandMarkPaths({leafClassName = '', padClassName = ''}) {
  return (
    <g fill="none" fillRule="evenodd">
      <path
        className={padClassName}
        fill="currentColor"
        d="M24 40c-7.2 0-13-4.8-13-11.2 0-4.6 2.8-8.4 5.6-11.2 2-2 3.8-4.2 5.2-6.8.6-1.1 1.6-1.8 2.2-1.8s1.6.7 2.2 1.8c1.4 2.6 3.2 4.8 5.2 6.8 2.8 2.8 5.6 6.6 5.6 11.2C37 35.2 31.2 40 24 40Z"
      />
      <circle className={padClassName} fill="currentColor" cx="14.5" cy="14" r="3.2" />
      <circle className={padClassName} fill="currentColor" cx="21" cy="10.2" r="3.4" />
      <circle className={padClassName} fill="currentColor" cx="27.5" cy="10.2" r="3.4" />
      <circle className={padClassName} fill="currentColor" cx="33.5" cy="14" r="3.2" />
      <path
        className={leafClassName}
        fill="currentColor"
        opacity="0.35"
        d="M31.5 22.5c3.8-1.2 7.2-4.2 8.8-8.2-4.2.4-8 2.8-10.2 6.2-.6 1-.8 2.1-.6 3.2 1.2-.2 1.5-.6 2-.1Z"
      />
    </g>
  );
}

export function BrandWordmarkPaths() {
  return (
    <g fill="currentColor">
      <path d="M4 6h14.5c6.2 0 10.5 3.6 10.5 9.2 0 5.4-4.1 9-10.3 9H12v9.8H4V6zm8 5.4v7.4h5.8c2.8 0 4.5-1.5 4.5-3.7S20.6 11.4 17.8 11.4H12z" />
      <path d="M48.2 34L41 6h8.6l4.4 18.2L58.6 6H67l-7.2 28h-7.6zm.8-11.2h10.4l-1.4 5.4h-7.6l-1.4-5.4z" />
      <path d="M72 6h7.4l3.8 20.4L87.4 6H95l4.2 20.4L103 6h7.4l-7.8 28h-8.2L90.2 14.2 86 34h-8.2L72 6z" />
      <path d="M116 6h14.2c6 0 10.2 3.4 10.2 8.8 0 4.2-2.6 7.2-6.6 8.4L142 34h-8.4l-7.2-10.2H124V34h-8V6zm8 5.4v7.2h5.4c2.6 0 4.2-1.3 4.2-3.6s-1.6-3.6-4.2-3.6H124z" />
      <path d="M168.2 34L161 6h8.6l4.4 18.2L178.6 6H187l-7.2 28h-7.6zm.8-11.2h10.4l-1.4 5.4h-7.6l-1.4-5.4z" />
    </g>
  );
}
