/**
 * @file PawraLogo.jsx
 * @description Monochrome PAWRA logo — black on light, white on dark/inverse.
 */

import {BrandMarkPaths, BrandWordmarkPaths, BRAND_BLACK, BRAND_WHITE} from './brandMark';

/**
 * @typedef {'primary' | 'icon-only' | 'light' | 'dark'} PawraLogoVariant
 */

/**
 * @param {{
 *   variant?: PawraLogoVariant;
 *   height?: number;
 *   className?: string;
 * }} props
 */
export function PawraLogo({variant = 'primary', height = 36, className = ''}) {
  const color =
    variant === 'light' ? BRAND_WHITE : variant === 'dark' ? BRAND_BLACK : BRAND_BLACK;

  if (variant === 'icon-only') {
    return (
      <svg
        role="img"
        aria-label="PAWRA"
        viewBox="0 0 48 48"
        width={height}
        height={height}
        className={`text-text-primary ${className}`}
        style={{color}}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>PAWRA</title>
        <BrandMarkPaths />
      </svg>
    );
  }

  const width = Math.round((height / 48) * 260);
  const ink = variant === 'light' ? BRAND_WHITE : BRAND_BLACK;

  return (
    <svg
      role="img"
      aria-label="PAWRA"
      viewBox="0 0 260 48"
      width={width}
      height={height}
      className={className}
      style={{color: ink}}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>PAWRA</title>
      <g transform="translate(0 0)">
        <BrandMarkPaths />
      </g>
      <g transform="translate(60 4)">
        <BrandWordmarkPaths />
      </g>
    </svg>
  );
}
