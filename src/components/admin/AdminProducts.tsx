'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { PlusIcon, PencilIcon, TrashIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface AdminProductsProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export default function AdminProducts({ products, onUpdateProducts }: AdminProductsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>('');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'groceries',
    image: '',
    stock: 0,
    isActive: true,
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'groceries',
      image: '',
      stock: 0,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      onUpdateProducts(updatedProducts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || formData.price === undefined) {
      alert('Please fill in all required fields');
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || `product-${Date.now()}`,
      name: formData.name!,
      description: formData.description!,
      price: formData.price!,
      category: formData.category!,
      image: formData.image || 'https://picsum.photos/300/200?random=999',
      stock: formData.stock || 0,
      isActive: formData.isActive ?? true,
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? productData : p);
    } else {
      updatedProducts = [...products, productData];
    }

    onUpdateProducts(updatedProducts);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : 
              type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Create object URL for preview
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));

    // In a real app, you would upload the file to a server here
    console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    console.log('Preview URL:', imageUrl);
  };

  const categoryColors = {
    groceries: 'bg-green-100 text-green-800',
    gifts: 'bg-purple-100 text-purple-800',
    essentials: 'bg-blue-100 text-blue-800',
  };

  // Bulk management functions
  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
      setShowBulkActions(true);
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedProducts.size === 0) return;

    const updatedProducts = products.map(product => {
      if (selectedProducts.has(product.id)) {
        switch (bulkAction) {
          case 'activate':
            return { ...product, isActive: true };
          case 'deactivate':
            return { ...product, isActive: false };
          case 'delete':
            return null;
          case 'setStock':
            const newStock = prompt(`Set stock for ${product.name}:`, product.stock.toString());
            if (newStock !== null) {
              return { ...product, stock: parseInt(newStock) || 0 };
            }
            return product;
          default:
            return product;
        }
      }
      return product;
    }).filter(Boolean) as Product[];

    onUpdateProducts(updatedProducts);
    setSelectedProducts(new Set());
    setShowBulkActions(false);
    setBulkAction('');
  };

  const exportProducts = () => {
    const csvContent = [
      ['Name', 'Description', 'Price', 'Category', 'Stock', 'Active', 'Image URL'],
      ...products.map(product => [
        product.name,
        product.description,
        product.price.toString(),
        product.category,
        product.stock.toString(),
        product.isActive.toString(),
        product.image
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        // const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
        
        const importedProducts: Product[] = lines.slice(1)
          .filter(line => line.trim())
          .map((line, index) => {
            const values = line.split(',').map(v => v.replace(/"/g, ''));
            return {
              id: `imported-${Date.now()}-${index}`,
              name: values[0] || '',
              description: values[1] || '',
              price: parseFloat(values[2]) || 0,
              category: values[3] as 'groceries' | 'gifts' | 'essentials' || 'groceries',
              stock: parseInt(values[4]) || 0,
              isActive: values[5] === 'true',
              image: values[6] || ''
            };
          });

        onUpdateProducts([...products, ...importedProducts]);
        alert(`Successfully imported ${importedProducts.length} products`);
      } catch (error) {
        alert('Error importing products. Please check the CSV format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Products</h2>
        <div className="flex space-x-2">
          <button
            onClick={exportProducts}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
            <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleImportProducts}
              className="hidden"
            />
          </label>
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {showBulkActions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-800">
                {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} selected
              </span>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-1 border border-blue-300 rounded-md text-sm"
              >
                <option value="">Select action...</option>
                <option value="activate">Activate</option>
                <option value="deactivate">Deactivate</option>
                <option value="setStock">Set Stock</option>
                <option value="delete">Delete</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedProducts(new Set());
                setShowBulkActions(false);
                setBulkAction('');
              }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Select All */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedProducts.size === products.length && products.length > 0}
          onChange={handleSelectAll}
          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">
          Select All ({products.length} products)
        </label>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              {/* Bulk selection checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedProducts.has(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const svg = `
                    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                      <rect width="300" height="200" fill="#4ade80"/>
                      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" dy=".3em">${product.name}</text>
                    </svg>
                  `;
                  target.src = `data:image/svg+xml;base64,${btoa(svg)}`;
                }}
              />
              {!product.isActive && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Inactive
                  </span>
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
              {product.stock > 0 && product.stock <= 5 && (
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Low Stock
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${categoryColors[product.category]}`}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                <span className="text-lg font-bold text-green-600">
                  £{product.price.toFixed(2)}
                </span>
              </div>

              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <span>Stock: {product.stock} units</span>
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Low Stock
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category || 'groceries'}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="groceries">Groceries</option>
                      <option value="gifts">Gifts</option>
                      <option value="essentials">Essentials</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image
                  </label>
                  <div className="space-y-4">
                    {/* Current Image Preview */}
                    {formData.image && (
                      <div className="relative w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image}
                          alt="Product preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Image URL Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image || ''}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Or Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: JPG, PNG, GIF, WebP (max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (£) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ''}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock || ''}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive ?? true}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
