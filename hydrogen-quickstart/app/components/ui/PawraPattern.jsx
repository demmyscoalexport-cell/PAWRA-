/**
 * @file PawraPattern.jsx
 * @description Subtle repeating brand texture — low-opacity teal marks.
 */

import {BRAND_TEAL} from './brandMark';

/**
 * Decorative pattern tile. Use as CSS background via url(#id) or inline absolute layer.
 * @param {{
 *   id?: string;
 *   opacity?: number;
 *   className?: string;
 *   asBackground?: boolean;
 * }} props
 */
export function PawraPattern({
  id = 'pawra-pattern',
  opacity = 0.12,
  className = '',
  asBackground = false,
}) {
  const pattern = (
    <pattern
      id={id}
      width="64"
      height="64"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(12)"
    >
      {/* Tiny leaf-paw silhouettes */}
      <g fill={BRAND_TEAL} opacity={opacity}>
        <circle cx="12" cy="10" r="2.2" />
        <circle cx="18" cy="8" r="2.4" />
        <circle cx="24" cy="10" r="2.2" />
        <path d="M18 14c-3.5 0-6.5 2.4-6.5 5.6 0 2.4 1.6 4.2 3.2 5.4 1.1 0.9 2.2 1.8 3.3 2.8.4.4 1 .4 1.4 0 1.1-1 2.2-1.9 3.3-2.8 1.6-1.2 3.2-3 3.2-5.4C25.9 16.4 22.9 14 18 14Z" />

        <circle cx="44" cy="42" r="1.8" />
        <circle cx="49" cy="40" r="2" />
        <circle cx="54" cy="42" r="1.8" />
        <path d="M49 45c-2.8 0-5.2 1.9-5.2 4.5 0 1.9 1.3 3.4 2.6 4.3.9.7 1.8 1.4 2.6 2.2.3.3.8.3 1.1 0 .8-.8 1.7-1.5 2.6-2.2 1.3-.9 2.6-2.4 2.6-4.3 0-2.6-2.4-4.5-5.2-4.5Z" />
      </g>
    </pattern>
  );

  if (asBackground) {
    return (
      <svg
        className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>{pattern}</defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    );
  }

  return (
    <svg width="0" height="0" className={className} aria-hidden="true">
      <defs>{pattern}</defs>
    </svg>
  );
}
