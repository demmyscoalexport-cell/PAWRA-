import React from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useDebouncedSearch } from '@/hooks/useShopify';
import { searchProducts } from '@/api/shopify';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/helpers';
import { mockProducts } from '@/data/mockProducts';
import { isShopifyConfigured, toDisplayPrice } from '@/utils/shopifyAdapters';

export const SearchDrawer = () => {
  const isSearchOpen = useUIStore((state) => state.isSearchOpen);
  const closeSearch = useUIStore((state) => state.closeSearch);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebouncedSearch(query, 300);
  const shopifyEnabled = isShopifyConfigured();

  const mapMockToSearchEdges = (products) =>
    products.map((product) => ({
      node: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        images: {
          edges: (product.images || []).slice(0, 1).map((image) => ({
            node: {
              src: image.src,
              altText: image.altText || product.title,
            },
          })),
        },
        priceRange: {
          minVariantPrice: {
            amount: String(product.price || '0'),
            currencyCode: 'USD',
          },
        },
      },
    }));

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setLoading(true);

      if (!shopifyEnabled) {
        const fallbackProducts = mockProducts
          .filter((product) => {
            const haystack =
              `${product.title} ${product.description} ${product.tags?.join(' ') || ''}`.toLowerCase();
            return haystack.includes(debouncedQuery.toLowerCase());
          })
          .slice(0, 12);
        setResults(mapMockToSearchEdges(fallbackProducts));
        setLoading(false);
        return;
      }

      searchProducts(debouncedQuery)
        .then((data) => {
          setResults(data.edges || []);
          setLoading(false);
        })
        .catch(() => {
          const fallbackProducts = mockProducts
            .filter((product) => {
              const haystack =
                `${product.title} ${product.description} ${product.tags?.join(' ') || ''}`.toLowerCase();
              return haystack.includes(debouncedQuery.toLowerCase());
            })
            .slice(0, 12);
          setResults(mapMockToSearchEdges(fallbackProducts));
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedQuery, shopifyEnabled]);

  useEffect(() => {
    if (!isSearchOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, closeSearch]);

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        className={`fixed inset-0 bg-matte-black/50 z-40 transition-opacity duration-300 ${
          isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSearch}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={`fixed inset-x-0 top-0 bg-ivory z-50 transition-transform duration-300 ${
          isSearchOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container h-screen flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between py-6 border-b border-sand/20">
            <h2 className="text-2xl font-serif font-bold">Search</h2>
            <button
              onClick={closeSearch}
              className="p-2 hover:bg-warm-white rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X size={24} className="text-matte-black" />
            </button>
          </div>

          {/* Search Input */}
          <div className="py-6">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              aria-label="Search products"
              className="w-full px-4 py-4 text-xl bg-warm-white border-2 border-sand/30 rounded-lg focus:outline-none focus:border-soft-emerald"
            />
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-sand border-t-matte-black" />
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((item) => {
                  const product = item.node;
                  const image = product.images?.edges?.[0]?.node;
                  const price = product.priceRange?.minVariantPrice?.amount || '0';

                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.handle}`}
                      onClick={closeSearch}
                      className="flex gap-4 p-4 hover:bg-warm-white rounded-lg transition-colors group"
                    >
                      {image && (
                        <div className="w-20 h-20 flex-shrink-0 bg-warm-white rounded-lg overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.altText || product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-matte-black group-hover:text-soft-emerald transition-colors">
                          {product.title}
                        </h3>
                        <p className="font-bold text-matte-black mt-2">
                          {formatPrice(toDisplayPrice(price))}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : query.length > 2 ? (
              <div className="text-center py-12">
                <p className="text-lg text-stone">No products found</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-stone">Start typing to search...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
