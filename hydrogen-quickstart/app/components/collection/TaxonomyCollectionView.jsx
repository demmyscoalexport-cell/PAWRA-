/**
 * @file TaxonomyCollectionView.jsx
 * @description Parent vs leaf collection layouts for Chewy-depth taxonomy.
 */

import {useSearchParams} from 'react-router';
import {Breadcrumbs} from '~/components/Breadcrumbs';
import {CategoryCard} from '~/components/collection/CategoryCard';
import {
  CollectionFilters,
  applyCollectionFilters,
} from '~/components/CollectionFilters';
import {PawraProductCard} from '~/components/PawraProductCard';
import {ProductCarousel} from '~/components/ProductCarousel';
import {getProductImage} from '~/data/productImages';

/** Category tiles use a representative product studio image */
const CATEGORY_IMAGES = {
  'dog-food': getProductImage('grain-free-salmon-sweet-potato'),
  'dog-treats': getProductImage('training-bites-dog'),
  'dog-toys': getProductImage('plush-squirrel-toy'),
  'dog-beds': getProductImage('ortho-memory-foam-bed'),
  'dog-grooming': getProductImage('oat-shampoo-dog'),
  'dog-walk-travel': getProductImage('no-pull-harness'),
  'cat-food': getProductImage('indoor-cat-kibble'),
  'cat-treats': getProductImage('organic-catnip'),
  'cat-toys': getProductImage('feather-wand-cat'),
  pharmacy: getProductImage('joint-chews-dog'),
};

/**
 * @param {{
 *   title: string;
 *   description?: string;
 *   breadcrumbs: Array<{ label: string; to?: string }>;
 *   childCategories?: Array<{ handle: string; title: string; description?: string; href: string }>;
 *   products?: Array<any>;
 *   isLeaf?: boolean;
 *   curatedProducts?: Array<any>;
 * }} props
 */
export function TaxonomyCollectionView({
  title,
  description,
  breadcrumbs,
  childCategories = [],
  products = [],
  isLeaf = false,
  curatedProducts = [],
}) {
  const [searchParams] = useSearchParams();
  const showCategories = !isLeaf && childCategories.length > 0;
  const visibleProducts = isLeaf
    ? applyCollectionFilters(products, searchParams)
    : products;

  return (
    <div className="bg-page-bg">
      <section className="border-b border-border-subtle bg-page-bg px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-1440">
          <Breadcrumbs className="mb-4" items={breadcrumbs} />
          <h1 className="font-serif text-display-m text-action-primary md:text-display-l">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-2xl font-sans text-body-l text-text-secondary">{description}</p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-1440 px-4 py-10 md:px-10 md:py-12">
        {showCategories ? (
          <>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-sans text-heading-m text-text-primary">Shop by category</h2>
              <p className="font-mono text-mono-s text-text-secondary">{childCategories.length} categories</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {childCategories.map((child) => (
                <CategoryCard
                  key={child.handle}
                  title={child.title}
                  href={child.href}
                  description={child.description}
                  imageUrl={CATEGORY_IMAGES[child.handle] || null}
                  icon={guessIcon(child.handle)}
                />
              ))}
            </div>
            {curatedProducts.length > 0 ? (
              <div className="mt-16">
                <ProductCarousel
                  products={curatedProducts}
                  title="Popular in this category"
                  subtitle="A few favorites to get you started."
                />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="mb-6">
              <CollectionFilters />
            </div>
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="font-mono text-mono-s text-text-secondary">
                {visibleProducts.length} product{visibleProducts.length === 1 ? '' : 's'}
              </p>
            </div>
            {visibleProducts.length ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {visibleProducts.map((product, index) => (
                  <PawraProductCard
                    key={product.id || product.handle}
                    product={product}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    showCompare
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border-subtle bg-surface px-6 py-16 text-center">
                <p className="font-sans text-body-l text-text-secondary">
                  No products in this collection yet. Check back soon.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/** @param {string} handle */
function guessIcon(handle) {
  if (handle.includes('food') || handle.includes('treat')) return 'leaf';
  if (handle.includes('toy')) return 'paw';
  if (handle.includes('bed') || handle.includes('furniture')) return 'heart';
  if (handle.includes('groom') || handle.includes('pharmacy') || handle.includes('health')) return 'shield';
  if (handle.includes('walk') || handle.includes('travel')) return 'truck';
  return 'paw';
}
