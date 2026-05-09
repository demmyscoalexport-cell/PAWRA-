import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { usePageMeta } from '@/hooks/usePageMeta';

export const AccountPage = () => {
  usePageMeta({
    title: 'Account - PAWRA',
    description: 'Manage your PAWRA account and customer preferences.',
  });

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="w-full">
      <section className="bg-ivory py-14 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-matte-black mb-4">
              Account
            </h1>
            <p className="text-lg text-stone">
              Manage profile details, saved addresses, and order history.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container max-w-3xl">
          <div className="rounded-lg border border-sand/20 bg-warm-white p-6 md:p-8">
            {isAuthenticated ? (
              <div>
                <p className="text-sm uppercase tracking-wide text-soft-emerald font-semibold mb-2">
                  Signed In
                </p>
                <h2 className="text-3xl font-serif font-bold text-matte-black mb-3">
                  Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
                </h2>
                <p className="text-stone mb-6">
                  Customer account features are connected and ready for Shopify customer auth
                  expansion.
                </p>
                <Button variant="secondary" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm uppercase tracking-wide text-soft-emerald font-semibold mb-2">
                  Guest Mode
                </p>
                <h2 className="text-3xl font-serif font-bold text-matte-black mb-3">
                  Customer login is coming next.
                </h2>
                <p className="text-stone mb-6">
                  The frontend page is complete. You can continue shopping while customer login
                  and order history endpoints are wired on backend.
                </p>
                <Link to="/collections">
                  <Button variant="primary">Shop Products</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
