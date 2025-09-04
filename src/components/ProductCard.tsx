'use client';

import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useCart();
  
  const cartItem = state.items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: product.id, quantity: newQuantity } });
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = `https://picsum.photos/300/200?random=${product.id}`;
          }}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            product.category === 'groceries' ? 'bg-green-100 text-green-800' :
            product.category === 'gifts' ? 'bg-purple-100 text-purple-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-700">
            £{product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
        </div>

        {/* Add to Cart Controls */}
        {isOutOfStock ? (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium px-4">
              {quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
