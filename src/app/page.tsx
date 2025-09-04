'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useCart } from '@/contexts/CartContext';

// Mock product data
const MOCK_PRODUCTS: Product[] = [
  // Groceries
  {
    id: '1',
    name: 'Fresh Milk (1L)',
    description: 'Fresh whole milk from local dairy',
    price: 1.50,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop&crop=center',
    stock: 20,
    isActive: true,
  },
  {
    id: '2',
    name: 'Free Range Eggs (6 pack)',
    description: 'Fresh free-range eggs from local farm',
    price: 2.50,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d3?w=300&h=200&fit=crop&crop=center',
    stock: 15,
    isActive: true,
  },
  {
    id: '3',
    name: 'Artisan Bread',
    description: 'Freshly baked sourdough bread',
    price: 3.00,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop&crop=center',
    stock: 8,
    isActive: true,
  },
  {
    id: '4',
    name: 'Local Honey (250g)',
    description: 'Pure local honey from Lake District bees',
    price: 4.50,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=200&fit=crop&crop=center',
    stock: 12,
    isActive: true,
  },
  {
    id: '5',
    name: 'Organic Vegetables Box',
    description: 'Seasonal organic vegetables from local farms',
    price: 8.00,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop&crop=center',
    stock: 5,
    isActive: true,
  },
  // Gifts
  {
    id: '6',
    name: 'Lake District Mug',
    description: 'Ceramic mug with Lake District landscape',
    price: 12.00,
    category: 'gifts',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=200&fit=crop&crop=center',
    stock: 25,
    isActive: true,
  },
  {
    id: '7',
    name: 'Handmade Soap Set',
    description: 'Luxury handmade soaps with local herbs',
    price: 15.00,
    category: 'gifts',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop&crop=center',
    stock: 10,
    isActive: true,
  },
  {
    id: '8',
    name: 'Cumbrian Whisky',
    description: 'Premium local whisky from Cumbria',
    price: 35.00,
    category: 'gifts',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop&crop=center',
    stock: 8,
    isActive: true,
  },
  {
    id: '9',
    name: 'Lake District Guide Book',
    description: 'Comprehensive guide to walking trails and attractions',
    price: 18.00,
    category: 'gifts',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
    stock: 15,
    isActive: true,
  },
  // Essentials
  {
    id: '10',
    name: 'Toilet Paper (4 pack)',
    description: 'Soft toilet paper, 4 rolls',
    price: 3.50,
    category: 'essentials',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop&crop=center',
    stock: 30,
    isActive: true,
  },
  {
    id: '11',
    name: 'Shower Gel',
    description: 'Refreshing shower gel, 250ml',
    price: 4.00,
    category: 'essentials',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop&crop=center',
    stock: 20,
    isActive: true,
  },
  {
    id: '12',
    name: 'First Aid Kit',
    description: 'Basic first aid supplies for camping',
    price: 12.50,
    category: 'essentials',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=center',
    stock: 8,
    isActive: true,
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { state } = useCart();

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Burns Farm Shop
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Order groceries and gifts for delivery to your cabin or pitch
        </p>
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-green-800 font-medium">
            🚚 Free delivery to all cabins and pitches • Order by 6 PM for next morning delivery
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}