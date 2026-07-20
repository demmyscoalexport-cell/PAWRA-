/**
 * Walker referral program content — featured walker story + client service reviews.
 */

import {BRAND} from '~/lib/branding';

export const FEATURED_WALKER = {
  name: 'Maya R.',
  role: 'Professional dog walker',
  location: 'Portland, ME',
  blurb:
    'Maya walks dogs full-time and recommends PAWRA gear to every client — from everyday collars to weather-ready leads.',
};

/** Client reviews about the walker’s services (trust for the program). */
export const WALKER_SERVICE_REVIEWS = [
  {
    quote:
      'Maya is incredibly reliable. Our anxious rescue comes home calm and happy after every walk — we trust her completely.',
    name: 'Elena K.',
    meta: 'Client · South Portland',
  },
  {
    quote:
      'She sends updates, treats our pup like family, and always shows up on time. Best walker we’ve ever hired.',
    name: 'Marcus T.',
    meta: 'Client · West End',
  },
  {
    quote:
      'Professional, kind, and great with multi-dog households. Neighbors ask for her number every week.',
    name: 'Priya S.',
    meta: 'Client · Munjoy Hill',
  },
];

export const WALKER_PROGRAM = {
  title: 'PAWRA Walker Referral Program',
  description:
    'Professional dog walkers: share PAWRA with your clients and earn rewards with your own referral code.',
  applyMailto: `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(
    'Walker Referral Program application',
  )}&body=${encodeURIComponent(
    'Name:\nCity:\nWebsite or Instagram:\nYears walking dogs:\nWhy you want to join:\n',
  )}`,
};
