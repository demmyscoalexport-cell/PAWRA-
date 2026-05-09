import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/stores/cartStore';
import { mockProducts } from '@/data/mockProducts';
import { formatPrice } from '@/utils/helpers';
import { useProduct } from '@/hooks/useShopify';
import { addToCart as addToShopifyCart, createCart } from '@/api/shopify';
import {
  isShopifyConfigured,
  normalizeShopifyCart,
  normalizeShopifyProduct,
  toDisplayPrice,
} from '@/utils/shopifyAdapters';
import { usePageMeta } from '@/hooks/usePageMeta';

export const ProductPage = () => {
  const { handle } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const addItem = useCartStore((state) => state.addItem);
  const cartId = useCartStore((state) => state.cartId);
  const setCart = useCartStore((state) => state.setCart);
  const setCartId = useCartStore((state) => state.setCartId);
  const shopifyEnabled = isShopifyConfigured();
  const { data: shopifyProduct, isLoading } = useProduct(handle, { enabled: shopifyEnabled });

  const normalizedShopifyProduct = shopifyEnabled ? normalizeShopifyProduct(shopifyProduct) : null;
  const product = normalizedShopifyProduct || mockProducts.find((p) => p.handle === handle);

  usePageMeta({
    title: product ? `${product.title} - PAWRA` : 'Product - PAWRA',
    description: product?.description || 'Premium pet product details and pricing.',
  });

  if (isLoading && shopifyEnabled) {
    return (
      <div className="container section-padding text-center">
        <p className="text-lg text-stone">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <h1 className="text-3xl font-serif font-bold text-matte-black">Product not found</h1>
      </div>
    );
  }

  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [
          {
            id: product.defaultVariantId || product.id,
            title: 'Default',
            availableForSale: true,
            price: { amount: product.price, currencyCode: 'USD' },
            compareAtPrice: product.compareAtPrice
              ? { amount: product.compareAtPrice, currencyCode: 'USD' }
              : null,
            selectedOptions: [],
          },
        ];
  const productOptions =
    product.options && product.options.length > 0
      ? product.options
      : (() => {
          const optionsMap = new Map();
          variants.forEach((variant) => {
            (variant.selectedOptions || []).forEach((option) => {
              if (!optionsMap.has(option.name)) optionsMap.set(option.name, new Set());
              optionsMap.get(option.name).add(option.value);
            });
          });
          return Array.from(optionsMap.entries()).map(([name, values]) => ({
            id: name,
            name,
            values: Array.from(values),
          }));
        })();

  React.useEffect(() => {
    if (!productOptions.length) return;

    setSelectedOptions((prev) => {
      const next = { ...prev };
      let changed = false;

      productOptions.forEach((option) => {
        if (!next[option.name] && option.values.length > 0) {
          next[option.name] = option.values[0];
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [productOptions]);

  const selectedVariantByOptions = variants.find((variant) =>
    (variant.selectedOptions || []).every((option) => selectedOptions[option.name] === option.value)
  );
  const selectedVariant =
    selectedVariantByOptions || variants.find((variant) => variant.id === selectedVariantId) || variants[0];
  const salePrice = toDisplayPrice(selectedVariant?.price?.amount ?? product.price);
  const comparePrice = selectedVariant?.compareAtPrice?.amount
    ? toDisplayPrice(selectedVariant.compareAtPrice.amount)
    : product.compareAtPrice
      ? toDisplayPrice(product.compareAtPrice)
      : null;
  const discount = comparePrice && comparePrice > salePrice 
    ? Math.round(((comparePrice - salePrice) / comparePrice) * 100)
    : 0;
  const isInStock = selectedVariant?.availableForSale !== false;

  const addLocally = () => {
    const variantId = selectedVariant?.id || product.defaultVariantId || product.id;

    addItem({
      id: `line-${variantId}`,
      quantity,
      merchandise: {
        id: variantId,
        title: product.title,
        selectedOptions: [],
        price: {
          amount: selectedVariant?.price?.amount ?? product.price,
          currencyCode: selectedVariant?.price?.currencyCode || 'USD',
        },
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          images: product.images,
        },
      },
    });
  };

  const handleAddToCart = async () => {
    if (!isInStock) return;

    if (!shopifyEnabled || !selectedVariant?.id) {
      addLocally();
      return;
    }

    setIsAdding(true);

    try {
      let activeCartId = cartId;

      if (!activeCartId) {
        const createdCart = await createCart([]);
        activeCartId = createdCart.id;
        setCartId(activeCartId);
        setCart(normalizeShopifyCart(createdCart));
      }

      const updatedCart = await addToShopifyCart(activeCartId, [
        {
          merchandiseId: selectedVariant.id,
          quantity,
        },
      ]);

      setCart(normalizeShopifyCart(updatedCart));
    } catch (error) {
      console.error('Failed Shopify cart add; using local cart fallback:', error);
      addLocally();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full">
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-warm-white rounded-lg overflow-hidden">
                  {product.images?.[selectedImage] && (
                    <img
                      src={product.images[selectedImage].src}
                      alt={product.images[selectedImage].altText}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? 'border-soft-emerald'
                            : 'border-sand/30'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.altText}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Breadcrumb */}
              <div className="text-sm text-stone">
                {product.vendor} • {product.category}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-matte-black">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3">
                  <div className="flex text-muted-gold">
                    {'★'.repeat(Math.round(product.rating))}
                  </div>
                  <span className="text-sm text-stone">
                    {product.rating} • {product.reviews} reviews
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-matte-black">
                    {formatPrice(salePrice)}
                  </span>
                  {comparePrice && comparePrice > salePrice && (
                    <>
                      <span className="text-xl text-stone line-through">
                        {formatPrice(comparePrice)}
                      </span>
                      <span className="text-lg font-semibold text-soft-emerald">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>
                <p
                  className={`text-sm font-medium ${
                    isInStock ? 'text-soft-emerald' : 'text-error'
                  }`}
                >
                  {isInStock ? 'In stock' : 'Out of stock'}
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-stone leading-relaxed">
                {product.description}
              </p>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-warm-white text-matte-black rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Variant Options */}
              {productOptions.length > 0 && (
                <div className="space-y-4">
                  {productOptions.map((option) => (
                    <div key={option.id || option.name}>
                      <label className="block text-matte-black font-medium mb-2">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const isActive = selectedOptions[option.name] === value;
                          return (
                            <button
                              key={`${option.name}-${value}`}
                              type="button"
                              onClick={() =>
                                setSelectedOptions((prev) => ({
                                  ...prev,
                                  [option.name]: value,
                                }))
                              }
                              className={`px-3 py-2 rounded-lg border transition-colors ${
                                isActive
                                  ? 'border-soft-emerald bg-soft-emerald/10 text-matte-black'
                                  : 'border-sand/30 hover:border-soft-emerald/50 text-matte-black'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Variant Fallback Selector */}
              {productOptions.length === 0 && variants.length > 1 && (
                <div>
                  <label className="block text-matte-black font-medium mb-2">Variant</label>
                  <select
                    value={selectedVariant?.id}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    className="w-full px-4 py-3 border border-sand/30 rounded-lg text-matte-black bg-white"
                  >
                    {variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-matte-black font-medium">Quantity:</span>
                <div className="flex items-center border border-sand/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-matte-black hover:bg-warm-white transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-matte-black font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-matte-black hover:bg-warm-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={isAdding || !isInStock}
                >
                  {isAdding ? 'Adding...' : isInStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="px-6 py-3 border-2 border-matte-black rounded-lg hover:bg-warm-white transition-colors"
                >
                  <Heart
                    size={24}
                    className={isWishlisted ? 'fill-error text-error' : 'text-matte-black'}
                  />
                </button>
                <button className="px-6 py-3 border-2 border-matte-black rounded-lg hover:bg-warm-white transition-colors">
                  <Share2 size={24} className="text-matte-black" />
                </button>
              </div>

              {/* Info Boxes */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-sand/20">
                <div className="text-center">
                  <p className="text-sm text-stone mb-1">Free Shipping</p>
                  <p className="font-semibold text-matte-black">On orders over $50</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-stone mb-1">Easy Returns</p>
                  <p className="font-semibold text-matte-black">30-day guarantee</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-padding bg-warm-white">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-matte-black mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {mockProducts
              .filter(
                (p) =>
                  p.species === product.species &&
                  p.category === product.category &&
                  p.id !== product.id
              )
              .slice(0, 4)
              .map((p) => (
                <div key={p.id} className="text-center">
                  <div className="aspect-square bg-ivory rounded-lg mb-4 overflow-hidden">
                    {p.images?.[0] && (
                      <img
                        src={p.images[0].src}
                        alt={p.images[0].altText}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-matte-black mb-2 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="font-bold text-matte-black">
                    {formatPrice(toDisplayPrice(p.price))}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
