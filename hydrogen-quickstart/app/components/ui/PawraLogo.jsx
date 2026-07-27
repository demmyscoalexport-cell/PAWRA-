/**
 * @file PawraLogo.jsx
 * @description PAWRA logo — forest green on light, white on header/inverse.
 */

import {BrandMarkPaths, BrandWordmarkPaths, BRAND_FOREST, BRAND_WHITE} from './brandMark';

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
    variant === 'light' ? BRAND_WHITE : BRAND_FOREST;

  if (variant === 'icon-only') {
    return (
      <svg
        role="img"
        aria-label="PAWRA"
        viewBox="0 0 48 48"
        width={height}
        height={height}
        className={className}
        style={{color}}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>PAWRA</title>
        <BrandMarkPaths />
      </svg>
    );
  }

  const width = Math.round((height / 48) * 260);

  return (
    <svg
      role="img"
      aria-label="PAWRA"
      viewBox="0 0 260 48"
      width={width}
      height={height}
      className={className}
      style={{color}}
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
