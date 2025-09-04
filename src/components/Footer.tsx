import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded shadow">
                <span className="text-gray-700 font-serif font-bold text-sm tracking-wide">BURNS</span>
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-700">
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
                <span className="text-gray-700 font-serif font-bold text-sm tracking-wide">FARM</span>
              </div>
              <h3 className="text-xl font-bold">Shop</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Your one-stop shop for groceries and gifts delivered directly to your cabin or pitch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/basket" className="text-gray-300 hover:text-white transition-colors">
                  Basket
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-300 hover:text-white transition-colors">
                  Checkout
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>Burns Farm Campsite</p>
              <p>Lake District, Cumbria</p>
              <p>Email: shop@burns-farm.co.uk</p>
              <p>Phone: 01768 123456</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Burns Farm Shop. All rights reserved. | 
            <Link href="https://burns-farm.co.uk" className="hover:text-white transition-colors ml-1">
              Visit Burns Farm Campsite
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
