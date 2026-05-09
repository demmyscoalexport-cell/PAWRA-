import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductCard';
import { Button } from '@/components/ui';
import { mockProducts } from '@/data/mockProducts';
import { useInfiniteProducts } from '@/hooks/useShopify';
import { isShopifyConfigured, normalizeShopifyProductsConnection, toDisplayPrice } from '@/utils/shopifyAdapters';
import { usePageMeta } from '@/hooks/usePageMeta';

export const CollectionsPage = () => {
  const { handle } = useParams();
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const shopifyEnabled = isShopifyConfigured();
  const {
    data: shopifyInfiniteData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({
    first: 24,
    enabled: shopifyEnabled,
  });
  const shopifyProducts =
    shopifyInfiniteData?.pages?.flatMap((page) =>
      normalizeShopifyProductsConnection(page)
    ) || [];
  const sourceProducts = shopifyProducts.length > 0 ? shopifyProducts : mockProducts;

  // Filter products based on collection
  const collectionProducts = sourceProducts.filter((product) => {
    if (handle === 'dogs') return product.species === 'dogs';
    if (handle === 'cats') return product.species === 'cats';
    return true;
  });

  // Apply filters
  const filteredProducts = collectionProducts.filter((product) => {
    const price = toDisplayPrice(product.price);
    if (price < priceRange[0] || price > priceRange[1]) return false;
    if (selectedProductTypes.length > 0 && !selectedProductTypes.includes(product.productType)) {
      return false;
    }
    if (selectedTags.length > 0) {
      return selectedTags.some((tag) => product.tags?.includes(tag));
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return toDisplayPrice(a.price) - toDisplayPrice(b.price);
      case 'price-high':
        return toDisplayPrice(b.price) - toDisplayPrice(a.price);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const collectionTitle = handle === 'dogs' ? 'Dogs' : handle === 'cats' ? 'Cats' : 'All Products';
  usePageMeta({
    title: `${collectionTitle} - PAWRA`,
    description: `Browse ${collectionTitle.toLowerCase()} products on PAWRA.`,
  });
  const allTags = [...new Set(collectionProducts.flatMap((p) => p.tags || []))];
  const allProductTypes = [...new Set(collectionProducts.map((p) => p.productType).filter(Boolean))];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-ivory py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-matte-black mb-4">
              {collectionTitle}
            </h1>
            <p className="text-lg text-stone">
              {collectionProducts.length} premium products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:border-r border-sand/20 pr-8"
            >
              {/* Filters */}
              <div className="space-y-8">
                {/* Sort */}
                <div>
                  <h3 className="font-semibold text-matte-black mb-4 flex items-center gap-2">
                    <Filter size={18} />
                    Sort By
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-sand/30 rounded-lg text-matte-black"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Best Rating</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-matte-black mb-4">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-stone">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {allTags.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-matte-black mb-4">Categories</h3>
                    <div className="space-y-2">
                      {allTags.map((tag) => (
                        <label key={tag} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTags([...selectedTags, tag]);
                              } else {
                                setSelectedTags(
                                  selectedTags.filter((t) => t !== tag)
                                );
                              }
                            }}
                            className="w-4 h-4 text-soft-emerald rounded"
                          />
                          <span className="ml-2 text-sm text-matte-black capitalize">
                            {tag}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Types */}
                {allProductTypes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-matte-black mb-4">Product Types</h3>
                    <div className="space-y-2">
                      {allProductTypes.map((type) => (
                        <label key={type} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedProductTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProductTypes([...selectedProductTypes, type]);
                              } else {
                                setSelectedProductTypes(
                                  selectedProductTypes.filter((t) => t !== type)
                                );
                              }
                            }}
                            className="w-4 h-4 text-soft-emerald rounded"
                          />
                          <span className="ml-2 text-sm text-matte-black">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Filters */}
                {(selectedTags.length > 0 ||
                  selectedProductTypes.length > 0 ||
                  sortBy !== 'newest' ||
                  priceRange[1] !== 500) && (
                  <Button
                    onClick={() => {
                      setSortBy('newest');
                      setPriceRange([0, 500]);
                      setSelectedTags([]);
                      setSelectedProductTypes([]);
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Products */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {sortedProducts.length > 0 ? (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-stone">
                        Showing {sortedProducts.length} of {collectionProducts.length} products
                      </p>
                    </div>
                    <ProductGrid products={sortedProducts} />
                    {shopifyEnabled && hasNextPage && (
                      <div className="mt-8 flex justify-center">
                        <Button
                          variant="secondary"
                          onClick={() => fetchNextPage()}
                          disabled={isFetchingNextPage}
                        >
                          {isFetchingNextPage ? 'Loading more...' : 'Load More Products'}
                        </Button>
                      </div>
                    )}
                  </>
                ) : isLoading && shopifyEnabled ? (
                  <ProductGrid products={[]} loading />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-stone">No products found matching your filters.</p>
                    <Button
                      onClick={() => {
                        setSortBy('newest');
                        setPriceRange([0, 500]);
                        setSelectedTags([]);
                        setSelectedProductTypes([]);
                      }}
                      variant="accent"
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
