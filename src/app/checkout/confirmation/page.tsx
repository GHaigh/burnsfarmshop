'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Order } from '@/types';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // Load order from localStorage
      const orders = JSON.parse(localStorage.getItem('burns-farm-orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      setOrder(foundOrder || null);
      setIsLoading(false);
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn&apos;t find the order you&apos;re looking for.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your order. We&apos;ll send you a confirmation email shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Delivery Date</p>
            <p className="font-medium">{order.deliveryDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Delivery Time</p>
            <p className="font-medium">{order.deliverySlot}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-medium text-lg text-green-600">£{order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{order.customer.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Accommodation</p>
            <p className="font-medium">{order.customer.accommodation}</p>
          </div>
        </div>
        {order.notes && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Special Instructions</p>
            <p className="font-medium">{order.notes}</p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-4">
              <div className="relative h-16 w-16 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">£{(item.product.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-600">£{item.product.price} each</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-green-600">£{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-green-800 mb-2">What happens next?</h3>
        <ul className="text-green-700 space-y-1">
          <li>• We&apos;ll prepare your order for delivery</li>
          <li>• You&apos;ll receive an email confirmation shortly</li>
          <li>• We&apos;ll deliver your order on {order.deliveryDate} between {order.deliverySlot}</li>
          <li>• You&apos;ll receive SMS and email updates when your order is delivered</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
