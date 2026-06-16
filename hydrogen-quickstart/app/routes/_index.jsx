import {
  HeroSection,
  TrustBar,
  HeroProductSpotlight,
  CompleteYourSetup,
  WhyPawra,
  Ecosystem,
  FrequentlyBoughtTogether,
  Testimonials,
  FAQ,
} from '~/components/sections';
import {BRAND} from '~/lib/branding';

export const meta = () => {
  return [
    {title: `PAWRA — ${BRAND.tagline} | ${BRAND.domain}`},
    {
      name: 'description',
      content:
        'Premium pet food, beds, toys, grooming supplies, collars, and wellness products for cats and dogs — delivered to your door.',
    },
  ];
};

export async function loader() {
  return {};
}

export default function Homepage() {
  return (
    <div className="home">
      <HeroSection />
      <TrustBar />
      <HeroProductSpotlight />
      <CompleteYourSetup />
      <WhyPawra />
      <Ecosystem />
      <FrequentlyBoughtTogether />
      <Testimonials />
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}

/** @typedef {import('./+types/_index').Route} Route */
