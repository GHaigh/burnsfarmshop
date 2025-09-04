'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { ACCOMMODATIONS, DELIVERY_SLOTS, Customer } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  
  const [customer, setCustomer] = useState<Customer>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    accommodation: '',
    accommodationType: 'cabin',
  });
  
  const [deliverySlot, setDeliverySlot] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate delivery date options (today + up to 7 days)
  const getDeliveryDateOptions = () => {
    const options = [];
    const now = new Date();
    const currentHour = now.getHours();
    const isAfter7PM = currentHour >= 19; // 7:00 PM
    
    for (let i = 0; i <= 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      const displayDate = date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // If it's after 7 PM and this is today (i === 0), disable it
      // If it's after 7 PM and this is tomorrow (i === 1), disable it
      const isDisabled = isAfter7PM && (i === 0 || i === 1);
      
      options.push({ 
        value: dateString, 
        label: displayDate,
        disabled: isDisabled
      });
    }
    
    return options;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccommodationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accommodationId = e.target.value;
    const accommodation = ACCOMMODATIONS.find(acc => acc.id === accommodationId);
    
    setCustomer(prev => ({
      ...prev,
      accommodation: accommodationId,
      accommodationType: accommodation?.type || 'cabin'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create order
    const order = {
      id: `ORDER-${Date.now()}`,
      customer,
      items: state.items,
      total: state.total,
      deliveryDate,
      deliverySlot,
      status: 'pending' as const,
      createdAt: new Date(),
      notes,
    };

    // Save order to localStorage (in a real app, this would go to a database)
    const existingOrders = JSON.parse(localStorage.getItem('burns-farm-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('burns-farm-orders', JSON.stringify(existingOrders));

    // Redirect to payment page
    router.push(`/checkout/payment?orderId=${order.id}&total=${order.total}`);
  };

  const isFormValid = customer.firstName && customer.lastName && customer.email && 
                     customer.phone && customer.accommodation && deliveryDate && deliverySlot;

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your basket is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to checkout!</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={customer.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={customer.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customer.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Accommodation Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Accommodation</h2>
            
            <div className="mb-4">
              <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 mb-1">
                Select your cabin or pitch *
              </label>
              <select
                id="accommodation"
                value={customer.accommodation}
                onChange={handleAccommodationChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Choose your accommodation...</option>
                <optgroup label="Cabins">
                  {ACCOMMODATIONS.filter(acc => acc.type === 'cabin').map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Hardstanding Pitches">
                  {ACCOMMODATIONS.filter(acc => acc.type === 'pitch').map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Delivery Date */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Date</h2>
            
            <div className="mb-4">
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Choose delivery date *
              </label>
              <select
                id="deliveryDate"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a delivery date...</option>
                {getDeliveryDateOptions().map(option => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    disabled={option.disabled}
                    className={option.disabled ? 'text-gray-400 bg-gray-100' : ''}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Explanation for disabled delivery options */}
            {(() => {
              const now = new Date();
              const currentHour = now.getHours();
              const isAfter7PM = currentHour >= 19;
              
              if (isAfter7PM) {
                return (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-sm">
                      <strong>Note:</strong> Same-day and next-day delivery are not available after 7:00 PM. 
                      Orders placed after 7:00 PM will be delivered the day after tomorrow.
                    </p>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* Delivery Slot */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Time</h2>
            
            <div className="mb-4">
              <label htmlFor="deliverySlot" className="block text-sm font-medium text-gray-700 mb-1">
                Choose delivery time slot *
              </label>
              <select
                id="deliverySlot"
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a time slot...</option>
                {DELIVERY_SLOTS.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 text-sm">
                <strong>Next day delivery:</strong> Orders placed before 6 PM will be delivered the following morning.
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Notes</h2>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Special instructions (optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Any special delivery instructions or requests..."
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/48x48/4ade80/ffffff?text=${encodeURIComponent(item.product.name)}`;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">£{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">£{state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>£{state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
