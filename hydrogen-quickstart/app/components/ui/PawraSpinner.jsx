/**
 * @file PawraSpinner.jsx
 * @description Brand loader — rotating PAWRA mark.
 */

import {BrandMarkPaths, BRAND_TEAL} from './brandMark';

/**
 * @param {{
 *   size?: number;
 *   className?: string;
 *   label?: string;
 * }} props
 */
export function PawraSpinner({size = 40, className = '', label = 'Loading'}) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className="animate-spin"
        style={{color: BRAND_TEAL, animationDuration: '1.1s'}}
        xmlns="http://www.w3.org/2000/svg"
      >
        <BrandMarkPaths />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
