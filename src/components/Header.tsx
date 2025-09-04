'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCartIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
              <Image
                src="/burns-farm-logo.png"
                alt="Burns Farm Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
                onError={(e) => {
                  console.error('Image failed to load:', e);
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">Shop</h1>
              <p className="text-green-200 text-sm">Campsite Groceries & Gifts</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-green-200 transition-colors">
              <HomeIcon className="w-5 h-5 inline mr-1" />
              Shop
            </Link>
            <Link href="/admin" className="hover:text-green-200 transition-colors">
              <UserIcon className="w-5 h-5 inline mr-1" />
              Admin
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link 
              href="/basket" 
              className="relative p-2 hover:bg-green-700 rounded-lg transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-green-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-700">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="flex items-center px-3 py-2 hover:bg-green-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Shop
              </Link>
              <Link 
                href="/admin" 
                className="flex items-center px-3 py-2 hover:bg-green-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserIcon className="w-5 h-5 mr-2" />
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
