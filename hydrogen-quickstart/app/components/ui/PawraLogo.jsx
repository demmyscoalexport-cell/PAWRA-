/**
 * @file PawraLogo.jsx
 * @description Primary PAWRA logo — icon + wordmark with theme variants.
 */

import {BrandMarkPaths, BrandWordmarkPaths, BRAND_INK, BRAND_TEAL, BRAND_WHITE} from './brandMark';

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
  if (variant === 'icon-only') {
    const size = height;
    const color = BRAND_TEAL;
    return (
      <svg
        role="img"
        aria-label="PAWRA"
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className={className}
        style={{color}}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>PAWRA</title>
        <BrandMarkPaths />
      </svg>
    );
  }

  const iconColor = variant === 'light' ? BRAND_WHITE : BRAND_TEAL;
  const textColor = variant === 'light' ? BRAND_WHITE : BRAND_INK;
  // Horizontal lockup: icon 48 + gap 12 + wordmark 200 = 260; height 48
  const width = Math.round((height / 48) * 260);

  return (
    <svg
      role="img"
      aria-label="PAWRA"
      viewBox="0 0 260 48"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>PAWRA</title>
      <g transform="translate(0 0)" style={{color: iconColor}}>
        <BrandMarkPaths />
      </g>
      <g transform="translate(60 4)" style={{color: textColor}}>
        <BrandWordmarkPaths />
      </g>
    </svg>
  );
}
