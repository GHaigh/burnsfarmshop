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
                <span className="text-gray-700 font-serif font-bold text-sm">BURNS</span>
                <svg width="16" height="16" viewBox="0 0 20 20" className="text-gray-700">
                  <path d="M10 2c-2 0-3.5 1.5-3.5 3.5 0 1.2.6 2.2 1.5 2.8-.2.6-.6 1.1-1 1.4-.4.3-.8.6-1.3.8-.5.2-1 .3-1.5.3-.6 0-1.2-.1-1.7-.3-.5-.2-.9-.5-1.3-.8-.4-.3-.8-.8-1-1.4.9-.6 1.5-1.6 1.5-2.8C2.5 3.5 4 2 6 2c1 0 1.8.4 2.4 1 .6-.6 1.4-1 2.4-1zm0 1.5c-.8 0-1.5.7-1.5 1.5S9.2 6.5 10 6.5s1.5-.7 1.5-1.5S10.8 3.5 10 3.5zm-4.5 6c.4 0 .8.1 1.1.3.3.2.5.5.6.8.1.3.2.6.2 1 0 .4-.1.7-.2 1-.1.3-.3.6-.6.8-.3.2-.7.3-1.1.3s-.8-.1-1.1-.3c-.3-.2-.5-.5-.6-.8-.1-.3-.2-.6-.2-1 0-.4.1-.7.2-1 .1-.3.3-.6.6-.8.3-.2.7-.3 1.1-.3zm9 0c.4 0 .8.1 1.1.3.3.2.5.5.6.8.1.3.2.6.2 1 0 .4-.1.7-.2 1-.1.3-.3.6-.6.8-.3.2-.7.3-1.1.3s-.8-.1-1.1-.3c-.3-.2-.5-.5-.6-.8-.1-.3-.2-.6-.2-1 0-.4.1-.7.2-1 .1-.3.3-.6.6-.8.3-.2.7-.3 1.1-.3z" fill="currentColor"/>
                </svg>
                <span className="text-gray-700 font-serif font-bold text-sm">FARM</span>
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
