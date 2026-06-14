import {
  HeroSection,
  TrustBar,
  HeroProductSpotlight,
  CompleteYourSetup,
  WhyPawra,
  Ecosystem,
  WalkerProgramSection,
  FrequentlyBoughtTogether,
  Testimonials,
  FAQ,
} from '~/components/sections';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    {title: 'PAWRA — Peace of Mind for Every Paw | shoppawra.com'},
    {
      name: 'description',
      content:
        'Smart pet technology for urban dog owners in New York. GPS collars, health tracking, and the PAWRA Walker Program.',
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
      <WalkerProgramSection />
      <FrequentlyBoughtTogether />
      <Testimonials />
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}

/** @typedef {import('./+types/_index').Route} Route */
