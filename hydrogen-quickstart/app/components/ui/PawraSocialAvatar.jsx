/**
 * @file PawraSocialAvatar.jsx
 * @description 1080×1080 social avatar template — icon on stone with subtle border.
 */

import {BrandMarkPaths, BRAND_STONE, BRAND_TEAL} from './brandMark';

/**
 * @param {{
 *   size?: number;
 *   className?: string;
 * }} props
 */
export function PawraSocialAvatar({size = 320, className = ''}) {
  return (
    <svg
      role="img"
      aria-label="PAWRA"
      viewBox="0 0 1080 1080"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>PAWRA</title>
      <rect width="1080" height="1080" fill={BRAND_STONE} />
      <rect
        x="48"
        y="48"
        width="984"
        height="984"
        rx="48"
        fill="none"
        stroke={BRAND_TEAL}
        strokeOpacity="0.22"
        strokeWidth="4"
      />
      <g transform="translate(300 300) scale(10)" style={{color: BRAND_TEAL}}>
        <BrandMarkPaths />
      </g>
    </svg>
  );
}
