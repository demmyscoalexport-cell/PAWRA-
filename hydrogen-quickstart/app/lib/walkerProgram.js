/**
 * Walker referral program content — featured walker story + client service reviews.
 */

import {BRAND} from '~/lib/branding';

export const FEATURED_WALKER = {
  name: 'Stacy Lynn Shaffer',
  role: 'Professional dog walker',
  location: `${BRAND.address.city}, ${BRAND.address.state}`,
  address: `${BRAND.address.line1}, ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.zip}`,
  blurb:
    `Stacy Lynn walks dogs full-time from ${BRAND.address.city}, ${BRAND.address.state} and recommends PAWRA gear to every client — from everyday collars to weather-ready leads.`,
};

/** Client reviews about the walker’s services (trust for the program). */
export const WALKER_SERVICE_REVIEWS = [
  {
    quote:
      'Stacy Lynn is incredibly reliable. Our anxious rescue comes home calm and happy after every walk — we trust her completely.',
    name: 'Elena K.',
    meta: `Client · ${BRAND.address.city}`,
  },
  {
    quote:
      'She sends updates, treats our pup like family, and always shows up on time. Best walker we’ve ever hired.',
    name: 'Marcus T.',
    meta: `Client · near ${BRAND.address.line1}`,
  },
  {
    quote:
      'Professional, kind, and great with multi-dog households. Neighbors ask for her number every week — and she always recommends PAWRA gear that actually lasts.',
    name: 'Priya S.',
    meta: `Client · ${BRAND.address.city}, ${BRAND.address.state}`,
  },
];

export const WALKER_PROGRAM = {
  title: 'PAWRA Walker Referral Program',
  description:
    'Professional dog walkers: share PAWRA with your clients and earn rewards with your own referral code.',
  exampleDiscountCode: 'WALKER-STACY10',
  applyMailto: `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(
    'Walker Referral Program application',
  )}&body=${encodeURIComponent(
    'Name:\nCity:\nWebsite or Instagram:\nYears walking dogs:\nWhy you want to join:\n',
  )}`,
};
