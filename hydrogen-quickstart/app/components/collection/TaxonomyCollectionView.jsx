/**
 * @file TaxonomyCollectionView.jsx
 * @description Parent vs leaf collection layouts for Chewy-depth taxonomy.
 */

import {Breadcrumbs} from '~/components/Breadcrumbs';
import {CategoryCard} from '~/components/collection/CategoryCard';
import {PawraProductCard} from '~/components/PawraProductCard';
import {ProductCarousel} from '~/components/ProductCarousel';

const CATEGORY_IMAGES = {
  'dog-food': 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&h=600&fit=crop',
  'dog-treats': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
  'dog-toys': 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800&h=600&fit=crop',
  'dog-beds': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
  'dog-grooming': 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop',
  'dog-walk-travel': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
  'cat-food': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
  'cat-treats': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop',
  'cat-toys': 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop',
  pharmacy: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop',
};

/**
 * @param {{
 *   title: string;
 *   description?: string;
 *   breadcrumbs: Array<{ label: string; to?: string }>;
 *   children?: Array<{ handle: string; title: string; description?: string; href: string }>;
 *   products?: Array<any>;
 *   isLeaf?: boolean;
 *   curatedProducts?: Array<any>;
 * }} props
 */
export function TaxonomyCollectionView({
  title,
  description,
  breadcrumbs,
  children = [],
  products = [],
  isLeaf = false,
  curatedProducts = [],
}) {
  const showCategories = !isLeaf && children.length > 0;

  return (
    <div className="bg-page-bg">
      <section className="border-b border-border-subtle bg-surface px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-1440">
          <Breadcrumbs className="mb-4" items={breadcrumbs} />
          <h1 className="font-serif text-display-m text-text-primary md:text-display-l">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-2xl font-sans text-body-l text-text-secondary">{description}</p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-1440 px-5 py-10 md:px-10 md:py-12">
        {showCategories ? (
          <>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-sans text-heading-m text-text-primary">Shop by category</h2>
              <p className="font-mono text-mono-s text-text-secondary">{children.length} categories</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => (
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
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="font-mono text-mono-s text-text-secondary">
                {products.length} product{products.length === 1 ? '' : 's'}
              </p>
            </div>
            {products.length ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {products.map((product, index) => (
                  <PawraProductCard
                    key={product.id || product.handle}
                    product={product}
                    loading={index < 4 ? 'eager' : 'lazy'}
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
