/**
 * Shared Cloudinary upload helpers for media scripts.
 */

/** @param {string} cloudinaryUrl */
export function parseCloudinaryUrl(cloudinaryUrl) {
  const match = cloudinaryUrl.match(/^cloudinary:\/\/(\d+):([^@]+)@(.+)$/);
  if (!match) {
    throw new Error('CLOUDINARY_URL must be cloudinary://<key>:<secret>@<cloud_name>');
  }
  const [, apiKey, apiSecret, cloudName] = match;
  return {apiKey, apiSecret, cloudName};
}

/**
 * @param {{ apiKey: string; apiSecret: string; cloudName: string }} creds
 * @param {'image' | 'video'} resourceType
 * @param {string} publicId
 * @param {string} remoteUrl
 */
export async function uploadRemoteAsset(creds, resourceType, publicId, remoteUrl) {
  const endpoint = `https://api.cloudinary.com/v1_1/${creds.cloudName}/${resourceType}/upload`;
  const body = new URLSearchParams({
    file: remoteUrl,
    public_id: publicId,
    overwrite: 'true',
    invalidate: 'true',
  });

  const auth = Buffer.from(`${creds.apiKey}:${creds.apiSecret}`).toString('base64');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || `${resourceType} upload failed (${res.status})`);
  }

  return json.public_id;
}
