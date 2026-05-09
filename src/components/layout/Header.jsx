import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const openCart = useUIStore((state) => state.openCart);
  const toggleSearch = useUIStore((state) => state.toggleSearch);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  const cartCount = getItemCount();

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-ivory/95 backdrop-blur-sm shadow-base' : 'bg-ivory'
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-serif font-bold text-matte-black">PAWRA</div>
        </Link>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/collections/dogs"
            className="text-base text-matte-black hover:text-soft-emerald transition-colors"
          >
            Dogs
          </Link>
          <Link
            to="/collections/cats"
            className="text-base text-matte-black hover:text-soft-emerald transition-colors"
          >
            Cats
          </Link>
          <Link
            to="/collections"
            className="text-base text-matte-black hover:text-soft-emerald transition-colors"
          >
            Shop All
          </Link>
          <Link
            to="/blog"
            className="text-base text-matte-black hover:text-soft-emerald transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button
            onClick={toggleSearch}
            className="p-2 hover:bg-warm-white rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-matte-black" />
          </button>

          {/* Wishlist Button */}
          <button
            className="p-2 hover:bg-warm-white rounded-lg transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={20} className="text-matte-black" />
          </button>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-warm-white rounded-lg transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} className="text-matte-black" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-soft-emerald text-ivory text-xs font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-warm-white rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-matte-black" />
            ) : (
              <Menu size={20} className="text-matte-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-sand/20 bg-warm-white/50 backdrop-blur-sm">
          <div className="container py-4 space-y-4">
            <Link
              to="/collections/dogs"
              className="block text-base text-matte-black hover:text-soft-emerald transition-colors"
            >
              Dogs
            </Link>
            <Link
              to="/collections/cats"
              className="block text-base text-matte-black hover:text-soft-emerald transition-colors"
            >
              Cats
            </Link>
            <Link
              to="/collections"
              className="block text-base text-matte-black hover:text-soft-emerald transition-colors"
            >
              Shop All
            </Link>
            <Link
              to="/blog"
              className="block text-base text-matte-black hover:text-soft-emerald transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/account"
              className="block text-base text-matte-black hover:text-soft-emerald transition-colors"
            >
              Account
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
