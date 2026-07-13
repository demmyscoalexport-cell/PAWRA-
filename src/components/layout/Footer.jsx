import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-matte-black text-ivory mt-24">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif font-bold mb-4">PAWRA</h2>
            <p className="text-sand text-sm mb-4">Premium lifestyle commerce for modern pet parents.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-sand hover:text-ivory transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sand hover:text-ivory transition-colors">
                TikTok
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/dogs" className="text-sand hover:text-ivory transition-colors text-sm">
                  Dogs
                </Link>
              </li>
              <li>
                <Link to="/collections/cats" className="text-sand hover:text-ivory transition-colors text-sm">
                  Cats
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-sand hover:text-ivory transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sand hover:text-ivory transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@pawrapetshop.com" className="text-sand hover:text-ivory transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/info/shipping" className="text-sand hover:text-ivory transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/info/returns" className="text-sand hover:text-ivory transition-colors text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/info/faq" className="text-sand hover:text-ivory transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/info/about" className="text-sand hover:text-ivory transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/info/careers" className="text-sand hover:text-ivory transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/info/press" className="text-sand hover:text-ivory transition-colors text-sm">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/info/sustainability" className="text-sand hover:text-ivory transition-colors text-sm">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sand text-sm mb-4">Subscribe for exclusive updates and offers.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-charcoal border-graphite placeholder-stone focus:ring-soft-emerald"
              />
              <Button
                type="submit"
                variant="accent"
                size="sm"
                className="w-full"
              >
                Subscribe
              </Button>
            </form>
            {subscribed && <p className="text-soft-emerald text-sm mt-2">Thank you for subscribing!</p>}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-graphite/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sand text-sm">
              © {new Date().getFullYear()} PAWRA. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/info/privacy" className="text-sand hover:text-ivory transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/info/terms" className="text-sand hover:text-ivory transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/info/cookies" className="text-sand hover:text-ivory transition-colors text-sm">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
