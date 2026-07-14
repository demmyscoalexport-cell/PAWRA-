import {Pagination} from '@shopify/hydrogen';
import {PawraProductCard} from '~/components/PawraProductCard';

/**
 * Product grid with Hydrogen cursor pagination.
 * @param {{
 *   connection: { nodes?: unknown[]; pageInfo?: unknown };
 *   products: Array<import('storefrontapi.generated').ProductItemFragment>;
 *   emptyMessage?: string;
 * }} props
 */
export function PawraCollectionGrid({connection, products, emptyMessage}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, NextLink, PreviousLink}) => {
        const displayProducts = products.length ? products : nodes;

        return (
          <>
            <PreviousLink className="mb-4 inline-block font-sans text-body-s text-forest-green underline">
              {isLoading ? 'Loading…' : '↑ Load previous'}
            </PreviousLink>

            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {displayProducts.map((product, index) => (
                <PawraProductCard
                  key={product.id}
                  product={product}
                  loading={index < 8 ? 'eager' : undefined}
                />
              ))}
            </div>

            {!displayProducts.length && (
              <p className="py-16 text-center font-sans text-body-m text-ink/60">
                {emptyMessage ?? 'No products match your filters.'}
              </p>
            )}

            <NextLink className="mt-8 inline-block w-full text-center font-sans text-body-s text-forest-green underline">
              {isLoading ? 'Loading…' : 'Load more products ↓'}
            </NextLink>
          </>
        );
      }}
    </Pagination>
  );
}
