/**
 * @file PawraBadge.jsx
 * @description Circular trust seal — PAWRA · EST 2024 · PREMIUM PET CARE
 */

import {BrandMarkPaths, BRAND_INK, BRAND_STONE, BRAND_TEAL} from './brandMark';

/**
 * @param {{
 *   size?: number;
 *   className?: string;
 * }} props
 */
export function PawraBadge({size = 120, className = ''}) {
  return (
    <svg
      role="img"
      aria-label="PAWRA Premium Pet Care, Est 2024"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>PAWRA · EST 2024 · PREMIUM PET CARE</title>
      <circle cx="60" cy="60" r="58" fill={BRAND_STONE} stroke={BRAND_TEAL} strokeWidth="1.5" />
      <circle cx="60" cy="60" r="44" fill="none" stroke={BRAND_TEAL} strokeOpacity="0.2" strokeWidth="1" />

      <defs>
        <path id="pawra-badge-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <text
        fill={BRAND_INK}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="7.5"
        fontWeight="600"
        letterSpacing="0.18em"
      >
        <textPath href="#pawra-badge-ring" startOffset="0%">
          PAWRA · EST 2024 · PREMIUM PET CARE ·
        </textPath>
      </text>

      <g transform="translate(36 36)" style={{color: BRAND_TEAL}}>
        <BrandMarkPaths />
      </g>
    </svg>
  );
}
