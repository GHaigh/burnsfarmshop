'use client';

import { useState, useEffect } from 'react';
import { Order, Product, User, UserInvitation } from '@/types';
import { MOCK_PRODUCTS } from '@/data/products';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminReports from '@/components/admin/AdminReports';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import { 
  ShoppingBagIcon, 
  CubeIcon, 
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

type AdminTab = 'orders' | 'products' | 'analytics' | 'reports' | 'users';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('burns-farm-orders') || '[]');
    let savedProducts = JSON.parse(localStorage.getItem('burns-farm-products') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('burns-farm-users') || '[]');
    const savedInvitations = JSON.parse(localStorage.getItem('burns-farm-invitations') || '[]');
    
    // Use new products if none saved or if we want to update
    if (savedProducts.length === 0) {
      savedProducts = MOCK_PRODUCTS;
      localStorage.setItem('burns-farm-products', JSON.stringify(MOCK_PRODUCTS));
    }
    
    // If no users saved, use mock data
    if (savedUsers.length === 0) {
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'admin@burnsfarm.co.uk',
          firstName: 'John',
          lastName: 'Smith',
          role: 'admin',
          status: 'active',
          invitedAt: new Date('2024-01-01'),
          joinedAt: new Date('2024-01-01'),
          lastLogin: new Date(),
        },
        {
          id: '2',
          email: 'manager@burnsfarm.co.uk',
          firstName: 'Sarah',
          lastName: 'Johnson',
          role: 'manager',
          status: 'active',
          invitedAt: new Date('2024-01-15'),
          joinedAt: new Date('2024-01-16'),
          lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
      ];
      setUsers(mockUsers);
      localStorage.setItem('burns-farm-users', JSON.stringify(mockUsers));
    } else {
      setUsers(savedUsers.map((user: User) => ({
        ...user,
        invitedAt: new Date(user.invitedAt),
        joinedAt: user.joinedAt ? new Date(user.joinedAt) : undefined,
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
      })));
    }

          setInvitations(savedInvitations.map((invitation: UserInvitation) => ({
      ...invitation,
      invitedAt: new Date(invitation.invitedAt),
      expiresAt: new Date(invitation.expiresAt),
    })));
    
    // If no products saved, use mock data
    if (savedProducts.length === 0) {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Fresh Milk (1L)',
          description: 'Fresh whole milk from local dairy',
          price: 1.50,
          category: 'groceries',
          image: 'https://picsum.photos/300/200?random=1',
          stock: 20,
          isActive: true,
        },
        {
          id: '2',
          name: 'Free Range Eggs (6 pack)',
          description: 'Fresh free-range eggs from local farm',
          price: 2.50,
          category: 'groceries',
          image: 'https://picsum.photos/300/200?random=2',
          stock: 15,
          isActive: true,
        },
        {
          id: '3',
          name: 'Artisan Bread',
          description: 'Freshly baked sourdough bread',
          price: 3.00,
          category: 'groceries',
          image: 'https://picsum.photos/300/200?random=3',
          stock: 8,
          isActive: true,
        },
        {
          id: '4',
          name: 'Local Honey (250g)',
          description: 'Pure local honey from Lake District bees',
          price: 4.50,
          category: 'groceries',
          image: 'https://picsum.photos/300/200?random=4',
          stock: 12,
          isActive: true,
        },
        {
          id: '5',
          name: 'Organic Vegetables Box',
          description: 'Seasonal organic vegetables from local farms',
          price: 8.00,
          category: 'groceries',
          image: 'https://picsum.photos/300/200?random=5',
          stock: 5,
          isActive: true,
        },
        {
          id: '6',
          name: 'Lake District Mug',
          description: 'Ceramic mug with Lake District landscape',
          price: 12.00,
          category: 'gifts',
          image: 'https://picsum.photos/300/200?random=6',
          stock: 25,
          isActive: true,
        },
        {
          id: '7',
          name: 'Handmade Soap Set',
          description: 'Luxury handmade soaps with local herbs',
          price: 15.00,
          category: 'gifts',
          image: 'https://picsum.photos/300/200?random=7',
          stock: 10,
          isActive: true,
        },
        {
          id: '8',
          name: 'Cumbrian Whisky',
          description: 'Premium local whisky from Cumbria',
          price: 35.00,
          category: 'gifts',
          image: 'https://picsum.photos/300/200?random=8',
          stock: 8,
          isActive: true,
        },
        {
          id: '9',
          name: 'Lake District Guide Book',
          description: 'Comprehensive guide to walking trails and attractions',
          price: 18.00,
          category: 'gifts',
          image: 'https://picsum.photos/300/200?random=9',
          stock: 15,
          isActive: true,
        },
        {
          id: '10',
          name: 'Toilet Paper (4 pack)',
          description: 'Soft toilet paper, 4 rolls',
          price: 3.50,
          category: 'essentials',
          image: 'https://picsum.photos/300/200?random=10',
          stock: 30,
          isActive: true,
        },
        {
          id: '11',
          name: 'Shower Gel',
          description: 'Refreshing shower gel, 250ml',
          price: 4.00,
          category: 'essentials',
          image: 'https://picsum.photos/300/200?random=7',
          stock: 20,
          isActive: true,
        },
        {
          id: '12',
          name: 'First Aid Kit',
          description: 'Basic first aid supplies for camping',
          price: 12.50,
          category: 'essentials',
          image: 'https://picsum.photos/300/200?random=12',
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

  const updateUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('burns-farm-users', JSON.stringify(updatedUsers));
  };

  const updateInvitations = (updatedInvitations: UserInvitation[]) => {
    setInvitations(updatedInvitations);
    localStorage.setItem('burns-farm-invitations', JSON.stringify(updatedInvitations));
  };

  const tabs = [
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon, count: orders.length },
    { id: 'products', name: 'Products', icon: CubeIcon, count: products.length },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'reports', name: 'Reports', icon: ChartBarIcon },
    { id: 'users', name: 'Users', icon: UserGroupIcon, count: users.length },
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
        {activeTab === 'analytics' && (
          <AdminAnalytics orders={orders} products={products} />
        )}
        {activeTab === 'reports' && (
          <AdminReports orders={orders} products={products} />
        )}
        {activeTab === 'users' && (
          <AdminUsers 
            users={users} 
            invitations={invitations} 
            onUpdateUsers={updateUsers} 
            onUpdateInvitations={updateInvitations} 
          />
        )}
      </div>
    </div>
  );
}
