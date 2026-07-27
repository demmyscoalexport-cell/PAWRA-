/**
 * @file PawraIcon.jsx
 * @description Standalone PAWRA brand mark (paw × leaf).
 */

import {BrandMarkPaths, BRAND_BLACK} from './brandMark';

/**
 * @param {{
 *   size?: number | string;
 *   className?: string;
 *   color?: string;
 *   title?: string;
 * }} props
 */
export function PawraIcon({
  size = 48,
  className = '',
  color = BRAND_BLACK,
  title = 'PAWRA',
}) {
  const px = typeof size === 'number' ? size : undefined;

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 48 48"
      width={px}
      height={px}
      className={className}
      style={
        typeof size === 'string'
          ? {width: size, height: size, color}
          : {color}
      }
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <BrandMarkPaths />
    </svg>
  );
}
