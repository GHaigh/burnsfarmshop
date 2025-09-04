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
    image: 'https://via.placeholder.com/300x200/87CEEB/ffffff?text=🥛+Fresh+Milk',
    stock: 20,
    isActive: true,
  },
  {
    id: '2',
    name: 'Free Range Eggs (6 pack)',
    description: 'Fresh free-range eggs from local farm',
    price: 2.50,
    category: 'groceries',
    image: 'https://via.placeholder.com/300x200/FFE4B5/ffffff?text=🥚+Free+Range+Eggs',
    stock: 15,
    isActive: true,
  },
  {
    id: '3',
    name: 'Artisan Bread',
    description: 'Freshly baked sourdough bread',
    price: 3.00,
    category: 'groceries',
    image: 'https://via.placeholder.com/300x200/D2B48C/ffffff?text=🍞+Artisan+Bread',
    stock: 8,
    isActive: true,
  },
  {
    id: '4',
    name: 'Local Honey (250g)',
    description: 'Pure local honey from Lake District bees',
    price: 4.50,
    category: 'groceries',
    image: 'https://via.placeholder.com/300x200/FFD700/ffffff?text=🍯+Local+Honey',
    stock: 12,
    isActive: true,
  },
  {
    id: '5',
    name: 'Organic Vegetables Box',
    description: 'Seasonal organic vegetables from local farms',
    price: 8.00,
    category: 'groceries',
    image: 'https://via.placeholder.com/300x200/90EE90/ffffff?text=🥬+Organic+Veggies',
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
    image: 'https://via.placeholder.com/300x200/8B4513/ffffff?text=☕+Lake+District+Mug',
    stock: 25,
    isActive: true,
  },
  {
    id: '7',
    name: 'Handmade Soap Set',
    description: 'Luxury handmade soaps with local herbs',
    price: 15.00,
    category: 'gifts',
    image: 'https://via.placeholder.com/300x200/F0E68C/ffffff?text=🧼+Handmade+Soap+Set',
    stock: 10,
    isActive: true,
  },
  {
    id: '8',
    name: 'Cumbrian Whisky',
    description: 'Premium local whisky from Cumbria',
    price: 35.00,
    category: 'gifts',
    image: 'https://via.placeholder.com/300x200/8B4513/ffffff?text=🥃+Cumbrian+Whisky',
    stock: 8,
    isActive: true,
  },
  {
    id: '9',
    name: 'Lake District Guide Book',
    description: 'Comprehensive guide to walking trails and attractions',
    price: 18.00,
    category: 'gifts',
    image: 'https://via.placeholder.com/300x200/228B22/ffffff?text=📖+Guide+Book',
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
    image: 'https://via.placeholder.com/300x200/FFFFFF/000000?text=🧻+Toilet+Paper',
    stock: 30,
    isActive: true,
  },
  {
    id: '11',
    name: 'Shower Gel',
    description: 'Refreshing shower gel, 250ml',
    price: 4.00,
    category: 'essentials',
    image: 'https://via.placeholder.com/300x200/87CEEB/ffffff?text=🧴+Shower+Gel',
    stock: 20,
    isActive: true,
  },
  {
    id: '12',
    name: 'First Aid Kit',
    description: 'Basic first aid supplies for camping',
    price: 12.50,
    category: 'essentials',
    image: 'https://via.placeholder.com/300x200/FF6B6B/ffffff?text=🏥+First+Aid+Kit',
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
        <p className="text-xl text-gray-600 mb-4">
          Order groceries and gifts for delivery to your cabin or pitch
        </p>
        <div className="text-gray-500 text-sm mb-6">
          <p>Burns Farm Caravan & Campsite • St Johns-in-the-Vale, Keswick, Cumbria CA12 4RR</p>
        </div>
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-green-800 font-medium">
            🚶‍♂️ Free delivery to all cabins and pitches • Order by 6 PM for next morning delivery
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