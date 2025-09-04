'use client';

import Link from 'next/link';
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
            <div className="flex items-center space-x-1 bg-white px-3 py-2 rounded-lg shadow-lg">
              <span className="text-gray-700 font-serif font-bold text-lg">BURNS</span>
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-700">
                <path d="M10 2c-2 0-3.5 1.5-3.5 3.5 0 1.2.6 2.2 1.5 2.8-.2.6-.6 1.1-1 1.4-.4.3-.8.6-1.3.8-.5.2-1 .3-1.5.3-.6 0-1.2-.1-1.7-.3-.5-.2-.9-.5-1.3-.8-.4-.3-.8-.8-1-1.4.9-.6 1.5-1.6 1.5-2.8C2.5 3.5 4 2 6 2c1 0 1.8.4 2.4 1 .6-.6 1.4-1 2.4-1zm0 1.5c-.8 0-1.5.7-1.5 1.5S9.2 6.5 10 6.5s1.5-.7 1.5-1.5S10.8 3.5 10 3.5zm-4.5 6c.4 0 .8.1 1.1.3.3.2.5.5.6.8.1.3.2.6.2 1 0 .4-.1.7-.2 1-.1.3-.3.6-.6.8-.3.2-.7.3-1.1.3s-.8-.1-1.1-.3c-.3-.2-.5-.5-.6-.8-.1-.3-.2-.6-.2-1 0-.4.1-.7.2-1 .1-.3.3-.6.6-.8.3-.2.7-.3 1.1-.3zm9 0c.4 0 .8.1 1.1.3.3.2.5.5.6.8.1.3.2.6.2 1 0 .4-.1.7-.2 1-.1.3-.3.6-.6.8-.3.2-.7.3-1.1.3s-.8-.1-1.1-.3c-.3-.2-.5-.5-.6-.8-.1-.3-.2-.6-.2-1 0-.4.1-.7.2-1 .1-.3.3-.6.6-.8.3-.2.7-.3 1.1-.3z" fill="currentColor"/>
              </svg>
              <span className="text-gray-700 font-serif font-bold text-lg">FARM</span>
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
