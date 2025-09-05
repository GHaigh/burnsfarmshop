'use client';

import { useState } from 'react';
import { Order } from '@/types';
import { format } from 'date-fns';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon,
  UserIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface AdminOrdersProps {
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-orange-100 text-orange-800',
  ready: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusIcons = {
  pending: ClockIcon,
  confirmed: CheckCircleIcon,
  preparing: ClockIcon,
  ready: CheckCircleIcon,
  delivered: UserIcon,
  cancelled: XCircleIcon,
};

export default function AdminOrders({ orders, onUpdateOrders }: AdminOrdersProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [notificationStatus, setNotificationStatus] = useState<{ [orderId: string]: 'sending' | 'sent' | null }>({});
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState<'email' | 'sms'>('email');

  // Mock notification functions (in a real app, these would call actual APIs)
  const sendDeliveryConfirmation = async (order: Order) => {
    const { customer, deliveryDate, deliverySlot, items, total } = order;
    
    // Set sending status
    setNotificationStatus(prev => ({ ...prev, [order.id]: 'sending' }));
    
    // Mock SMS sending
    console.log(`📱 SMS sent to ${customer.phone}:`);
    console.log(`Your Burns Farm Shop order has been delivered! Order #${order.id} delivered on ${deliveryDate} at ${deliverySlot}. Total: £${total.toFixed(2)}. Thank you for choosing Burns Farm!`);
    
    // Mock Email sending
    console.log(`📧 Email sent to ${customer.email}:`);
    console.log(`Subject: Your Burns Farm Shop Order Has Been Delivered!`);
    console.log(`Dear ${customer.firstName} ${customer.lastName},`);
    console.log(`Your order #${order.id} has been successfully delivered to ${customer.accommodation} on ${deliveryDate} at ${deliverySlot}.`);
    console.log(`Items delivered:`);
    items.forEach(item => {
      console.log(`- ${item.product.name} x${item.quantity} - £${(item.product.price * item.quantity).toFixed(2)}`);
    });
    console.log(`Total: £${total.toFixed(2)}`);
    console.log(`Thank you for choosing Burns Farm Shop! We hope you enjoy your groceries and gifts.`);
    console.log(`Best regards,`);
    console.log(`The Burns Farm Team`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Set sent status
    setNotificationStatus(prev => ({ ...prev, [order.id]: 'sent' }));
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setNotificationStatus(prev => ({ ...prev, [order.id]: null }));
    }, 3000);
    
    // In a real app, you would call actual APIs here:
    // await sendSMS(customer.phone, smsMessage);
    // await sendEmail(customer.email, emailSubject, emailBody);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    onUpdateOrders(updatedOrders);
    
    // If status changed to delivered, send confirmation
    if (newStatus === 'delivered') {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        sendDeliveryConfirmation(order);
      }
    }
  };

  const sendCustomerMessage = async (order: Order) => {
    if (!messageText.trim()) return;

    setNotificationStatus(prev => ({ ...prev, [order.id]: 'sending' }));

    // Mock sending message
    setTimeout(() => {
      console.log(`Sending ${messageType} to ${order.customer.email}:`, messageText);
      setNotificationStatus(prev => ({ ...prev, [order.id]: 'sent' }));
      setShowMessageModal(false);
      setMessageText('');
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setNotificationStatus(prev => ({ ...prev, [order.id]: null }));
      }, 3000);
    }, 1000);
  };

  const openMessageModal = (order: Order) => {
    setSelectedOrder(order);
    setShowMessageModal(true);
  };

  // Format cabin names for display (remove hyphens, capitalize properly)
  const formatCabinName = (accommodation: string) => {
    return accommodation
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Format date as DD-MM-YYYY
  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        order.id.toLowerCase().includes(query) ||
        order.customer.firstName.toLowerCase().includes(query) ||
        order.customer.lastName.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query) ||
        order.customer.accommodation.toLowerCase().includes(query);
      
      if (!matchesSearch) {
        return false;
      }
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      
      switch (dateFilter) {
        case 'today':
          if (orderDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (orderDate < weekAgo) return false;
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (orderDate < monthAgo) return false;
          break;
      }
    }
    
    return true;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders by ID, customer name, email, or accommodation..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        
        <div className="text-sm text-gray-600">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
        </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accommodation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => {
                const StatusIcon = statusIcons[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer.firstName} {order.customer.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCabinName(order.customer.accommodation)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(order.deliveryDate)} - {order.deliverySlot}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      £{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-green-600 hover:text-green-900 text-xs font-medium px-2 py-1 border border-green-300 rounded hover:bg-green-50"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => openMessageModal(order)}
                          className="text-blue-600 hover:text-blue-900 text-xs font-medium px-2 py-1 border border-blue-300 rounded hover:bg-blue-50 flex items-center"
                          title="Send message to customer"
                        >
                          <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                          Message
                        </button>
                        <a
                          href={`mailto:${order.customer.email}`}
                          className="text-purple-600 hover:text-purple-900 text-xs font-medium px-2 py-1 border border-purple-300 rounded hover:bg-purple-50 flex items-center"
                          title="Send email"
                        >
                          <EnvelopeIcon className="w-3 h-3 mr-1" />
                          Email
                        </a>
                        <a
                          href={`tel:${order.customer.phone}`}
                          className="text-orange-600 hover:text-orange-900 text-xs font-medium px-2 py-1 border border-orange-300 rounded hover:bg-orange-50 flex items-center"
                          title="Call customer"
                        >
                          <PhoneIcon className="w-3 h-3 mr-1" />
                          Call
                        </a>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {/* Notification status indicator */}
                        {notificationStatus[order.id] && (
                          <div className="flex items-center space-x-1">
                            {notificationStatus[order.id] === 'sending' && (
                              <div className="flex items-center space-x-1 text-blue-600">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                                <span className="text-xs">Sending...</span>
                              </div>
                            )}
                            {notificationStatus[order.id] === 'sent' && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <CheckCircleIcon className="w-3 h-3" />
                                <span className="text-xs">Sent!</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto print:max-w-none print:max-h-none print:shadow-none print:rounded-none">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Order Details</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                  >
                    Print Packing Slip
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Print Header - Only visible when printing */}
              <div className="hidden print:block print:mb-6 print:border-b print:pb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Burns Farm Shop - Packing Slip</h1>
                <p className="text-gray-600">Order #{selectedOrder.id} • {formatDate(selectedOrder.createdAt)}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order ID</label>
                    <p className="text-sm">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p className="text-sm">{selectedOrder.status}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Customer</label>
                  <p className="text-sm">
                    {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.email}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Delivery</label>
                  <p className="text-sm">{formatCabinName(selectedOrder.customer.accommodation)}</p>
                  <p className="text-sm text-gray-600">{formatDate(selectedOrder.deliveryDate)} - {selectedOrder.deliverySlot}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Items</label>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>£{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>£{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Send Message to Customer
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Customer:</strong> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Order:</strong> {selectedOrder.id}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Type
              </label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value as 'email' | 'sms')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Type your message here..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText('');
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => sendCustomerMessage(selectedOrder)}
                disabled={!messageText.trim() || notificationStatus[selectedOrder.id] === 'sending'}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {notificationStatus[selectedOrder.id] === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}