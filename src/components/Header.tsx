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
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-lg">
              <span className="text-gray-700 font-serif font-bold text-lg tracking-wide">BURNS</span>
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-gray-700">
                <g>
                  {/* Sheep body */}
                  <ellipse cx="12" cy="14" rx="6" ry="4" fill="currentColor" opacity="0.8"/>
                  {/* Sheep head */}
                  <ellipse cx="12" cy="8" rx="3" ry="2.5" fill="currentColor"/>
                  {/* Sheep legs */}
                  <rect x="8" y="16" width="1" height="3" fill="currentColor"/>
                  <rect x="10" y="16" width="1" height="3" fill="currentColor"/>
                  <rect x="13" y="16" width="1" height="3" fill="currentColor"/>
                  <rect x="15" y="16" width="1" height="3" fill="currentColor"/>
                  {/* Sheep ears */}
                  <ellipse cx="9.5" cy="7" rx="0.8" ry="1.2" fill="currentColor" transform="rotate(-20 9.5 7)"/>
                  <ellipse cx="14.5" cy="7" rx="0.8" ry="1.2" fill="currentColor" transform="rotate(20 14.5 7)"/>
                  {/* Wool texture dots */}
                  <circle cx="9" cy="12" r="0.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="12" cy="11" r="0.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="15" cy="12" r="0.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="10" cy="15" r="0.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="14" cy="15" r="0.5" fill="currentColor" opacity="0.6"/>
                </g>
              </svg>
              <span className="text-gray-700 font-serif font-bold text-lg tracking-wide">FARM</span>
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
