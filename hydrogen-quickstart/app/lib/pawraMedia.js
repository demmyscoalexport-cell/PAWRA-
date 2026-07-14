/**
 * Homepage hero media — Cloudinary images with optional WaveSpeed videos.
 * Run `npm run media:upload-hero` then `npm run media:generate-hero-videos`.
 */

import {cloudinaryImageUrl, cloudinaryVideoUrl} from '~/lib/cloudinary';

const HERO_IMAGE_OPTS = {width: 1400, height: 900, crop: 'fill', gravity: 'auto'};
const HERO_VIDEO_OPTS = {width: 1400, crop: 'fill', quality: 'auto'};

const HERO_PUBLIC_IDS = {
  essentials: 'pawra/hero/essentials',
  autoship: 'pawra/hero/autoship',
  deals: 'pawra/hero/deals',
};

const HERO_VIDEO_PUBLIC_IDS = {
  essentials: 'pawra/hero/essentials-video',
  autoship: 'pawra/hero/autoship-video',
  deals: 'pawra/hero/deals-video',
};

function heroImageUrl(id) {
  return cloudinaryImageUrl(HERO_PUBLIC_IDS[id], HERO_IMAGE_OPTS);
}

/** @typedef {{label: string; href: string}} HeroCta */
/** @typedef {{id: string; headline: string; subheadline: string; image: string; imageAlt: string; video?: string; ctaPrimary: HeroCta; ctaSecondary: HeroCta}} HeroSlide */

/** @type {HeroSlide[]} */
export const PAWRA_HERO_SLIDES = [
  {
    id: 'essentials',
    headline: 'Everything your pets need, delivered fast',
    subheadline:
      'Premium food, treats, beds, and wellness — curated for cats and dogs.',
    image: heroImageUrl('essentials'),
    video: cloudinaryVideoUrl(HERO_VIDEO_PUBLIC_IDS.essentials, HERO_VIDEO_OPTS),
    imageAlt: 'Happy golden retriever with pet supplies',
    ctaPrimary: {label: 'Shop now', href: '/collections/all'},
    ctaSecondary: {label: 'About PAWRA', href: '/pages/about'},
  },
  {
    id: 'autoship',
    headline: 'Never run out of kibble, litter, or treats',
    subheadline: 'Set your schedule, skip or cancel anytime — essentials on autopilot.',
    image: heroImageUrl('autoship'),
    video: cloudinaryVideoUrl(HERO_VIDEO_PUBLIC_IDS.autoship, HERO_VIDEO_OPTS),
    imageAlt: 'Dog enjoying meal time at home',
    ctaPrimary: {label: 'Shop food', href: '/collections/all'},
    ctaSecondary: {label: 'How it works', href: '/pages/how-it-works'},
  },
  {
    id: 'deals',
    headline: "Today's best deals for dogs & cats",
    subheadline: 'Top-rated brands at member-friendly prices — while supplies last.',
    image: heroImageUrl('deals'),
    video: cloudinaryVideoUrl(HERO_VIDEO_PUBLIC_IDS.deals, HERO_VIDEO_OPTS),
    imageAlt: 'Cat relaxing on a cozy pet bed',
    ctaPrimary: {label: 'Shop all', href: '/collections/all'},
    ctaSecondary: {label: 'Contact us', href: '/pages/contact'},
  },
];
