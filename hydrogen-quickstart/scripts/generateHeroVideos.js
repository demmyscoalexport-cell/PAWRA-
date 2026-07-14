/**
 * Generate hero carousel videos via WaveSpeed, then persist on Cloudinary.
 * Usage: npm run media:generate-hero-videos
 */

import {loadEnvFile} from './loadEnv.js';
import {HERO_VIDEO_SOURCES} from '../app/lib/pawraMediaSources.js';
import {parseCloudinaryUrl, uploadRemoteAsset} from './cloudinaryUpload.js';
import {generateImageToVideo} from './wavespeedClient.js';

loadEnvFile();

const apiKey = process.env.WAVESPEED_API_KEY;
const cloudinaryUrl = process.env.CLOUDINARY_URL;
const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'dxizihlmo';

if (!apiKey) {
  console.error('Missing WAVESPEED_API_KEY in .env');
  process.exit(1);
}
if (!cloudinaryUrl) {
  console.error('Missing CLOUDINARY_URL in .env');
  process.exit(1);
}

const creds = parseCloudinaryUrl(cloudinaryUrl);

/** @param {string} publicId */
function cloudinaryImageDeliveryUrl(publicId) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:good,w_1280,c_fill,g_auto/${publicId}`;
}

async function main() {
  console.log(`Generating ${HERO_VIDEO_SOURCES.length} hero videos via WaveSpeed…\n`);

  for (const {id, imagePublicId, prompt} of HERO_VIDEO_SOURCES) {
    const imageUrl = cloudinaryImageDeliveryUrl(imagePublicId);
    console.log(`→ ${id}: submitting I2V job…`);

    const videoUrl = await generateImageToVideo(apiKey, {
      prompt,
      image: imageUrl,
      duration: 5,
      resolution: '720p',
    });

    console.log(`  ✓ generated → uploading to Cloudinary…`);
    const publicId = await uploadRemoteAsset(
      creds,
      'video',
      `pawra/hero/${id}-video`,
      videoUrl,
    );
    console.log(`  ✓ ${id} → ${publicId}\n`);
  }

  console.log('Done. Hero videos are on Cloudinary as pawra/hero/{id}-video');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
