/**
 * @file policies._index.jsx
 * @description Shopify policy index with PAWRA styling.
 */

import {useLoaderData, Link} from 'react-router';

export const meta = () => [{title: 'PAWRA | Policies'}];

export async function loader({context}) {
  const data = await context.storefront.query(POLICIES_QUERY);

  const shopPolicies = data.shop;
  const policies = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter((policy) => policy != null);

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  const {policies} = useLoaderData();

  return (
    <div className="bg-warm-oat px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-display-s text-forest-green">Policies</h1>
        <p className="mt-4 font-sans text-body-l text-ink/80">
          Shipping, returns, privacy, and terms for shopping at PAWRA.
        </p>
        <ul className="mt-10 space-y-4">
          {policies.map((policy) => (
            <li key={policy.id}>
              <Link
                to={`/policies/${policy.handle}`}
                className="block rounded-xl bg-cloud px-6 py-4 font-sans text-body-m font-semibold text-forest-green no-underline shadow-card hover:shadow-md"
              >
                {policy.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

/** @typedef {import('./+types/policies._index').Route} Route */
