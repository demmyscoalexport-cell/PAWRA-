import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/utils/helpers';

export const ProductCard = ({ product, index = 0 }) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const navigate = useNavigate();

  if (!product) return null;

  const image = product.images?.[0];
  const salePrice = parseFloat(product.price);
  const comparePrice = product.compareAtPrice ? parseFloat(product.compareAtPrice) : null;
  const discount = comparePrice && comparePrice > salePrice 
    ? Math.round(((comparePrice - salePrice) / comparePrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.handle}`}>
        <div className="rounded-lg overflow-hidden bg-warm-white relative mb-4">
          {/* Image Container */}
          <div className="aspect-square bg-warm-white overflow-hidden relative">
            {image && (
              <img
                src={image.src}
                alt={image.altText || product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Discount Badge */}
            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-soft-emerald text-ivory text-xs font-bold px-3 py-1 rounded-full">
                -{discount}%
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-base hover:shadow-md transition-shadow"
              aria-label={`Toggle wishlist for ${product.title}`}
            >
              <Heart
                size={20}
                className={isWishlisted ? 'fill-error text-error' : 'text-matte-black'}
              />
            </button>

            {/* Quick Add Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/product/${product.handle}`);
              }}
              className="absolute bottom-0 left-0 right-0 bg-matte-black text-ivory py-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label={`View ${product.title}`}
            >
              <ShoppingBag size={18} />
              <span className="font-medium">View Product</span>
            </button>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="text-xs text-stone uppercase tracking-wider mb-1">
              {product.vendor}
            </div>
            <h3 className="font-serif text-lg font-bold text-matte-black mb-2 line-clamp-2 group-hover:text-soft-emerald transition-colors">
              {product.title}
            </h3>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-warm-white text-matte-black rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-muted-gold">
                  {'★'.repeat(Math.round(product.rating))}
                </div>
                <span className="text-xs text-stone">
                  ({product.reviews || 0})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-matte-black">
                {formatPrice(salePrice)}
              </span>
              {comparePrice && comparePrice > salePrice && (
                <span className="text-sm text-stone line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const ProductGrid = ({ products, loading = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-warm-white rounded-lg aspect-square animate-pulse" />
          ))
        : products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
    </div>
  );
};
