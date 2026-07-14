/**

 * @file _index.jsx

 * @description PAWRA homepage — hero, featured products, and brand sections.

 */



import {useLoaderData} from 'react-router';

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

import {

  HOMEPAGE_COLLECTION_QUERY,

  HOMEPAGE_PRODUCTS_QUERY,

} from '~/lib/homepageProducts';



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



export async function loader({context}) {

  const {storefront} = context;



  const [{products}, {collection}] = await Promise.all([

    storefront.query(HOMEPAGE_PRODUCTS_QUERY, {

      variables: {first: 12},

      cache: storefront.CacheShort(),

    }),

    storefront.query(HOMEPAGE_COLLECTION_QUERY, {

      variables: {handle: 'frontpage', first: 8},

      cache: storefront.CacheShort(),

    }),

  ]);



  const catalog = products?.nodes ?? [];

  const featured = collection?.products?.nodes ?? [];

  const pool = featured.length > 0 ? featured : catalog;



  return {

    featuredProduct: pool[0] ?? null,

    featuredProducts: pool.slice(0, 5),

    bundleProducts: pickBundleProducts(pool.length > 0 ? pool : catalog),

  };

}



/** Pick three distinct products for the bundle row. */

function pickBundleProducts(products) {

  if (products.length <= 3) return products;

  return [products[0], products[Math.floor(products.length / 2)], products[products.length - 1]];

}



export default function Homepage() {

  const {featuredProduct, featuredProducts, bundleProducts} = useLoaderData();



  return (

    <div className="home">

      <HeroSection />

      <TrustBar />



      <HeroProductSpotlight product={featuredProduct} />

      <CompleteYourSetup products={featuredProducts} />



      <WhyPawra />

      <Ecosystem />



      <FrequentlyBoughtTogether products={bundleProducts} />

      <Testimonials />



      <div id="faq">

        <FAQ />

      </div>

    </div>

  );

}



/** @typedef {import('./+types/_index').Route} Route */

