/** Remote hero sources for Cloudinary fetch/upload scripts (no React imports). */

export const HERO_UPLOAD_SOURCES = [
  {
    id: 'essentials',
    url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'autoship',
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'deals',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80',
  },
];

/** WaveSpeed image-to-video jobs — source must already exist on Cloudinary. */
export const HERO_VIDEO_SOURCES = [
  {
    id: 'essentials',
    imagePublicId: 'pawra/hero/essentials',
    prompt: 'Golden retriever panting happily, tail wagging gently, soft natural light',
  },
  {
    id: 'autoship',
    imagePublicId: 'pawra/hero/autoship',
    prompt: 'Dog eating from bowl contentedly, subtle head movement, cozy home lighting',
  },
  {
    id: 'deals',
    imagePublicId: 'pawra/hero/deals',
    prompt: 'Cat stretching slowly on a cozy bed, blinking, calm ambient motion',
  },
];
