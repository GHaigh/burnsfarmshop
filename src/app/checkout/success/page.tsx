'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/contexts/CartContext';
import { useEffect } from 'react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { dispatch } = useCart();

  // Clear cart on successful payment
  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed and we'll prepare your items for delivery.
        </p>

        {orderId && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID: <span className="font-mono font-medium">{orderId}</span></p>
          </div>
        )}

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">What happens next?</h2>
          <ul className="text-green-700 text-sm space-y-1 text-left">
            <li>• We'll prepare your order for next morning delivery</li>
            <li>• You'll receive a confirmation email shortly</li>
            <li>• Your order will be delivered to your selected accommodation</li>
            <li>• We'll contact you if we have any questions</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Need help? Contact us at shop@burns-farm.co.uk or call 01768 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
