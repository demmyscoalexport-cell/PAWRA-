/**
 * @file PawraWordmark.jsx
 * @description PAWRA geometric SVG wordmark (no icon).
 */

import {BrandWordmarkPaths, BRAND_INK} from './brandMark';

/**
 * @param {{
 *   height?: number;
 *   className?: string;
 *   color?: string;
 * }} props
 */
export function PawraWordmark({height = 28, className = '', color = BRAND_INK}) {
  const width = Math.round((height / 40) * 200);

  return (
    <svg
      role="img"
      aria-label="PAWRA"
      viewBox="0 0 200 40"
      width={width}
      height={height}
      className={className}
      style={{color}}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>PAWRA</title>
      <BrandWordmarkPaths />
    </svg>
  );
}
