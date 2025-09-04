import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white px-2 py-1 rounded shadow">
                <img
                  src="/burns-farm-logo.png"
                  alt="Burns Farm Logo"
                  className="h-8 w-auto"
                />
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
