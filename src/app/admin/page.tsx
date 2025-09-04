'use client';

import { useState, useEffect } from 'react';
import { Order, Product } from '@/types';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminReports from '@/components/admin/AdminReports';
import { 
  ShoppingBagIcon, 
  CubeIcon, 
  ChartBarIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';

type AdminTab = 'orders' | 'products' | 'reports';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('burns-farm-orders') || '[]');
    const savedProducts = JSON.parse(localStorage.getItem('burns-farm-products') || '[]');
    
    // If no products saved, use mock data
    if (savedProducts.length === 0) {
      const mockProducts: Product[] = [
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
      setProducts(mockProducts);
      localStorage.setItem('burns-farm-products', JSON.stringify(mockProducts));
    } else {
      setProducts(savedProducts);
    }
    
    setOrders(savedOrders);
    setIsLoading(false);
  }, []);

  const updateOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('burns-farm-orders', JSON.stringify(updatedOrders));
  };

  const updateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('burns-farm-products', JSON.stringify(updatedProducts));
  };

  const tabs = [
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon, count: orders.length },
    { id: 'products', name: 'Products', icon: CubeIcon, count: products.length },
    { id: 'reports', name: 'Reports', icon: ChartBarIcon },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage orders, products, and view reports</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'orders' && (
          <AdminOrders orders={orders} onUpdateOrders={updateOrders} />
        )}
        {activeTab === 'products' && (
          <AdminProducts products={products} onUpdateProducts={updateProducts} />
        )}
        {activeTab === 'reports' && (
          <AdminReports orders={orders} products={products} />
        )}
      </div>
    </div>
  );
}
