/**
 * Upload homepage hero sources to Cloudinary (server-side script).
 * Usage: npm run media:upload-hero
 */

import {loadEnvFile} from './loadEnv.js';
import {HERO_UPLOAD_SOURCES} from '../app/lib/pawraMediaSources.js';
import {parseCloudinaryUrl, uploadRemoteAsset} from './cloudinaryUpload.js';

loadEnvFile();

const cloudinaryUrl = process.env.CLOUDINARY_URL;
if (!cloudinaryUrl) {
  console.error('Missing CLOUDINARY_URL in .env');
  process.exit(1);
}

const creds = parseCloudinaryUrl(cloudinaryUrl);

async function main() {
  console.log(`Uploading ${HERO_UPLOAD_SOURCES.length} hero images to Cloudinary (${creds.cloudName})…\n`);

  for (const {id, url} of HERO_UPLOAD_SOURCES) {
    const publicId = await uploadRemoteAsset(creds, 'image', `pawra/hero/${id}`, url);
    console.log(`  ✓ ${id} → ${publicId}`);
  }

  console.log('\nDone. Hero images live at pawra/hero/{id}');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
