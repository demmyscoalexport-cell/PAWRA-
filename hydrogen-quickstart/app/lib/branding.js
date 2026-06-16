/** PAWRA brand constants — pawrapetshop.com */
export const BRAND = {
  name: 'PAWRA',
  tagline: 'Premium pet products for cats and dogs',
  domain: 'pawrapetshop.com',
  url: 'https://pawrapetshop.com',
  supportEmail: 'support@pawrapetshop.com',
  address: {
    line1: '256 Chapman Road',
    city: 'Presque Isle',
    state: 'ME',
    zip: '04769',
    country: 'United States',
  },
  copyright: '© 2026 PAWRA LLC · Presque Isle, ME · pawrapetshop.com',
};

export const ABOUT_COPY = {
  title: 'About PAWRA',
  description: BRAND.tagline,
  body: `
    <p>Pawra was founded with one mission: give every pet owner access to premium products for their cats and dogs. We curate the best pet food, beds, toys, grooming supplies, collars, and wellness products — all delivered to your door.</p>
    <p><strong>${BRAND.tagline}</strong></p>
    <p>Questions? Email us at <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a>.</p>
  `,
};
