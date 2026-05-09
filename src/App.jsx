import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Layouts
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchDrawer } from '@/components/search/SearchDrawer';

// Pages
import { HomePage } from '@/pages/HomePage';
import { CollectionsPage } from '@/pages/CollectionsPage';
import { ProductPage } from '@/pages/ProductPage';
import { BlogPage } from '@/pages/BlogPage';
import { AccountPage } from '@/pages/AccountPage';
import { InfoPage } from '@/pages/InfoPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useCartStore } from '@/stores/cartStore';
import { getCart } from '@/api/shopify';
import { isShopifyConfigured, normalizeShopifyCart } from '@/utils/shopifyAdapters';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

function CartSyncBootstrap() {
  const cartId = useCartStore((state) => state.cartId);
  const setCart = useCartStore((state) => state.setCart);
  const clearCart = useCartStore((state) => state.clearCart);

  React.useEffect(() => {
    if (!isShopifyConfigured() || !cartId) return;

    let isMounted = true;

    const syncCart = async () => {
      try {
        const cart = await getCart(cartId);
        if (!isMounted) return;

        if (!cart) {
          clearCart();
          return;
        }

        setCart(normalizeShopifyCart(cart));
      } catch (error) {
        console.error('Failed to hydrate Shopify cart:', error);
      }
    };

    syncCart();

    return () => {
      isMounted = false;
    };
  }, [cartId, setCart, clearCart]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CartSyncBootstrap />
        <div className="min-h-screen bg-ivory flex flex-col">
          <Header />
          <CartDrawer />
          <SearchDrawer />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:handle" element={<CollectionsPage />} />
              <Route path="/product/:handle" element={<ProductPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/info/:slug" element={<InfoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}
