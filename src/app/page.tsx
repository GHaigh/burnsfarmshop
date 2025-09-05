'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { MOCK_PRODUCTS, SEASONAL_COLLECTIONS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useCart } from '@/contexts/CartContext';
import ProductSearch from '@/components/ProductSearch';

// Seasonal filter options
const SEASONAL_FILTERS = [
  { id: 'all', name: 'All Products', color: 'bg-gray-500' },
  { id: 'spring', name: 'Spring Awakening', color: 'bg-green-400' },
  { id: 'summer', name: 'Summer BBQ', color: 'bg-orange-500' },
  { id: 'autumn', name: 'Autumn Harvest', color: 'bg-amber-600' },
  { id: 'winter', name: 'Winter Warmers', color: 'bg-blue-500' },
  { id: 'all-year', name: 'All Year', color: 'bg-gray-500' },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeasonal, setSelectedSeasonal] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { state } = useCart();

  // Load products from localStorage or use mock data
  useEffect(() => {
    const savedProducts = localStorage.getItem('burns-farm-products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      // Check if we have the new seasonal products
      const hasSeasonalProducts = parsedProducts.some((p: Product) => p.seasonal);
      if (!hasSeasonalProducts) {
        // Migrate to new products with seasonal data
        console.log('Migrating to new seasonal products');
        localStorage.setItem('burns-farm-products', JSON.stringify(MOCK_PRODUCTS));
        setProducts(MOCK_PRODUCTS);
        setFilteredProducts(MOCK_PRODUCTS);
      } else {
        setProducts(parsedProducts);
        setFilteredProducts(parsedProducts);
      }
    } else {
      // Save mock products to localStorage
      localStorage.setItem('burns-farm-products', JSON.stringify(MOCK_PRODUCTS));
      setProducts(MOCK_PRODUCTS);
      setFilteredProducts(MOCK_PRODUCTS);
    }
  }, []);

  // Filter products based on category, seasonal, and search
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by seasonal
    if (selectedSeasonal !== 'all') {
      filtered = filtered.filter(product => product.seasonal === selectedSeasonal);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedSeasonal, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSeasonalChange = (seasonal: string) => {
    setSelectedSeasonal(seasonal);
  };

  // Get current season for featured products
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    if (month >= 12 || month <= 2) return 'winter';
    return 'winter'; // Default to winter
  };

  const currentSeason = getCurrentSeason();
  const featuredProducts = products.filter(p => p.featured && p.seasonal === currentSeason);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Burns Farm Shop
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Order groceries and gifts for hand delivery to your cabin or hard standing pitch
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
              <span className="flex items-center">
                🚶‍♂️ Hand delivered to your cabin or hard standing pitch • Next day delivery only • Order by 7 PM
              </span>
            </div>
            <div className="mt-6 text-sm">
              <p>Burns Farm Caravan & Campsite, St Johns-in-the-Vale, Keswick, Cumbria CA12 4RR</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Seasonal Collection */}
        {featuredProducts.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className={`w-4 h-4 rounded-full ${SEASONAL_COLLECTIONS[currentSeason as keyof typeof SEASONAL_COLLECTIONS]?.color || 'bg-gray-500'} mr-3`}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {SEASONAL_COLLECTIONS[currentSeason as keyof typeof SEASONAL_COLLECTIONS]?.name || 'Featured Collection'}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                {SEASONAL_COLLECTIONS[currentSeason as keyof typeof SEASONAL_COLLECTIONS]?.description || 'Perfect for the current season'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <ProductSearch onSearch={handleSearch} />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
                
                {/* Seasonal Filter */}
                <div className="flex flex-wrap gap-2">
                  {SEASONAL_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => handleSeasonalChange(filter.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedSeasonal === filter.id
                          ? `${filter.color} text-white`
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedSeasonal === 'all' ? 'All Products' : SEASONAL_FILTERS.find(f => f.id === selectedSeasonal)?.name}
            </h2>
            <span className="text-gray-500">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {state.items.length > 0 && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-medium">
                {state.items.length} item{state.items.length !== 1 ? 's' : ''} in your basket
              </span>
              <span className="text-green-900 font-bold">
                Total: £{state.total.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}