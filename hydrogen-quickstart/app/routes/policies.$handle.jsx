/**
 * @file policies.$handle.jsx
 * @description Individual Shopify policy page with PAWRA styling.
 */

import {Link, useLoaderData} from 'react-router';

export const meta = ({data}) => {
  return [{title: `PAWRA | ${data?.policy.title ?? 'Policy'}`}];
};

export async function loader({params, context}) {
  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1) => m1.toUpperCase());

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  return {policy};
}

export default function Policy() {
  const {policy} = useLoaderData();

  return (
    <div className="bg-warm-oat px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link to="/policies" className="font-sans text-body-s text-forest-green underline">
          ← All policies
        </Link>
        <h1 className="mt-6 font-serif text-display-s text-forest-green">{policy.title}</h1>
        <div
          className="prose-pawra mt-10 font-sans text-body-m text-ink [&_a]:text-forest-green [&_a]:underline [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-heading-s [&_p]:mt-4"
          dangerouslySetInnerHTML={{__html: policy.body}}
        />
      </div>
    </div>
  );
}

const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;

/** @typedef {import('./+types/policies.$handle').Route} Route */
