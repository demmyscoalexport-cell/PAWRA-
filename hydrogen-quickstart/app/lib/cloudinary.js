/**
 * Cloudinary URL helpers for images and video delivery.
 * Client-safe: only uses PUBLIC_CLOUDINARY_CLOUD_NAME (no API secret).
 */

const FALLBACK_CLOUD_NAME = 'dxizihlmo';

/** @returns {string} */
export function getCloudinaryCloudName() {
  const fromEnv =
    typeof import.meta !== 'undefined' &&
    import.meta.env?.PUBLIC_CLOUDINARY_CLOUD_NAME;
  const trimmed = fromEnv ? String(fromEnv).trim() : '';
  return trimmed || FALLBACK_CLOUD_NAME;
}

/**
 * Build a Cloudinary delivery URL from a public ID or remote fetch URL.
 *
 * @param {string} source — `pawra/hero/slide-1` or `https://…`
 * @param {{
 *   width?: number;
 *   height?: number;
 *   crop?: string;
 *   gravity?: string;
 *   quality?: string;
 *   format?: string;
 * }} [options]
 * @returns {string}
 */
export function cloudinaryImageUrl(source, options = {}) {
  const cloud = getCloudinaryCloudName();
  const {
    width = 1400,
    height,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto:good',
    format = 'auto',
  } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    width && `w_${width}`,
    height && `h_${height}`,
    crop && `c_${crop}`,
    gravity && crop === 'fill' && `g_${gravity}`,
  ]
    .filter(Boolean)
    .join(',');

  const isRemote = /^https?:\/\//i.test(source);
  const deliveryType = isRemote ? 'fetch' : 'upload';
  const path = isRemote ? encodeURIComponent(source) : source;

  return `https://res.cloudinary.com/${cloud}/image/${deliveryType}/${transforms}/${path}`;
}

/**
 * @param {string} publicId
 * @param {{ width?: number; crop?: string; quality?: string }} [options]
 * @returns {string}
 */
export function cloudinaryVideoUrl(publicId, options = {}) {
  const cloud = getCloudinaryCloudName();
  const {width = 1280, crop = 'fill', quality = 'auto'} = options;
  const transforms = [`f_auto`, `q_${quality}`, `w_${width}`, `c_${crop}`].join(',');
  return `https://res.cloudinary.com/${cloud}/video/upload/${transforms}/${publicId}`;
}
