import React from 'react';
import { X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui';
import { formatPrice } from '@/utils/helpers';
import { removeFromCart as removeFromShopifyCart, updateCartLines } from '@/api/shopify';
import { isShopifyConfigured, normalizeShopifyCart } from '@/utils/shopifyAdapters';

export const CartDrawer = () => {
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const closeCart = useUIStore((state) => state.closeCart);
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const getCheckoutUrl = useCartStore((state) => state.getCheckoutUrl);
  const cartId = useCartStore((state) => state.cartId);
  const setCart = useCartStore((state) => state.setCart);
  const [busyLineId, setBusyLineId] = React.useState(null);
  const shopifyEnabled = isShopifyConfigured();

  if (!isCartOpen) return null;

  const checkoutUrl = getCheckoutUrl();
  const total = getCartTotal();
  
  const handleUpdateQuantity = async (lineId, quantity) => {
    if (!shopifyEnabled || !cartId) {
      updateItemQuantity(lineId, quantity);
      return;
    }

    setBusyLineId(lineId);

    try {
      if (quantity <= 0) {
        const updatedCart = await removeFromShopifyCart(cartId, [lineId]);
        setCart(normalizeShopifyCart(updatedCart));
      } else {
        const updatedCart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
        setCart(normalizeShopifyCart(updatedCart));
      }
    } catch (error) {
      console.error('Failed Shopify quantity update; using local fallback:', error);
      if (quantity <= 0) {
        removeItem(lineId);
      } else {
        updateItemQuantity(lineId, quantity);
      }
    } finally {
      setBusyLineId(null);
    }
  };

  const handleRemove = async (lineId) => {
    if (!shopifyEnabled || !cartId) {
      removeItem(lineId);
      return;
    }

    setBusyLineId(lineId);

    try {
      const updatedCart = await removeFromShopifyCart(cartId, [lineId]);
      setCart(normalizeShopifyCart(updatedCart));
    } catch (error) {
      console.error('Failed Shopify remove; using local fallback:', error);
      removeItem(lineId);
    } finally {
      setBusyLineId(null);
    }
  };

  React.useEffect(() => {
    if (!isCartOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        className={`fixed inset-0 bg-matte-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-ivory shadow-luxury-lg z-50 transition-transform duration-300 flex flex-col overflow-hidden ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sand/20">
          <h2 className="text-2xl font-serif font-bold">Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-warm-white rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={24} className="text-matte-black" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-stone mb-4">Your cart is empty</p>
              <Button onClick={closeCart} variant="accent">
                Continue Shopping
              </Button>
            </div>
          ) : (
            cart.lines.map((line) => (
              <div key={line.id} className="flex items-start space-x-4 pb-4 border-b border-sand/20">
                {/* Image */}
                {line.merchandise.product.images?.[0] && (
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-warm-white">
                    <img
                      src={line.merchandise.product.images[0].src}
                      alt={line.merchandise.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-matte-black text-sm">
                    {line.merchandise.product.title}
                  </h3>
                  <p className="text-xs text-stone mb-2">
                    {line.merchandise.title}
                  </p>
                  <p className="font-semibold text-matte-black">
                    {formatPrice(parseFloat(line.merchandise.price.amount))}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(line.id, Math.max(1, line.quantity - 1))}
                      className="px-2 py-1 border border-sand rounded hover:bg-warm-white transition-colors"
                      disabled={busyLineId === line.id}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{line.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
                      className="px-2 py-1 border border-sand rounded hover:bg-warm-white transition-colors"
                      disabled={busyLineId === line.id}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(line.id)}
                      className="ml-auto text-error hover:opacity-70 transition-opacity text-sm"
                      disabled={busyLineId === line.id}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <div className="border-t border-sand/20 p-6 space-y-4">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(parseFloat(cart.cost.subtotal.amount))}</span>
            </div>
            <p className="text-xs text-stone">
              Shipping and taxes calculated at checkout
            </p>
            <Button
              as="a"
              href={checkoutUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="w-full"
              disabled={!checkoutUrl}
            >
              Checkout
            </Button>
            <Button
              onClick={closeCart}
              variant="secondary"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
