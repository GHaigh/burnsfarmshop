export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'groceries' | 'gifts' | 'essentials';
  image: string;
  stock: number;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accommodation: string;
  accommodationType: 'cabin' | 'pitch';
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  deliveryDate: string;
  deliverySlot: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  notes?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'cabin' | 'pitch';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'staff';
  status: 'active' | 'pending' | 'inactive';
  invitedAt: Date;
  joinedAt?: Date;
  lastLogin?: Date;
}

export interface UserInvitation {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'expired';
  token: string;
}

export const ACCOMMODATIONS: Accommodation[] = [
  // All Cabins (Alphabetical Order)
  { id: 'angle-tarn', name: 'Angle Tarn', type: 'cabin' },
  { id: 'beacon-tarn', name: 'Beacon Tarn', type: 'cabin' },
  { id: 'blea-tarn', name: 'Blea Tarn', type: 'cabin' },
  { id: 'bleaberry-tarn', name: 'Bleaberry Tarn', type: 'cabin' },
  { id: 'blind-tarn', name: 'Blind Tarn', type: 'cabin' },
  { id: 'bowscale-tarn', name: 'Bowscale Tarn', type: 'cabin' },
  { id: 'burnmoor-tarn', name: 'Burnmoor Tarn', type: 'cabin' },
  { id: 'dock-tarn', name: 'Dock Tarn', type: 'cabin' },
  { id: 'easedale-tarn', name: 'Easedale Tarn', type: 'cabin' },
  { id: 'red-tarn', name: 'Red Tarn', type: 'cabin' },
  { id: 'scales-tarn', name: 'Scales Tarn', type: 'cabin' },
  { id: 'sprinkling-tarn', name: 'Sprinkling Tarn', type: 'cabin' },
  { id: 'stickle-tarn', name: 'Stickle Tarn', type: 'cabin' },
  { id: 'styhead-tarn', name: 'Styhead Tarn', type: 'cabin' },
  
  // Low Rigg - Touring Pitches (1-14)
  { id: 'low-rigg-1', name: 'Low Rigg - Touring Pitch 1', type: 'pitch' },
  { id: 'low-rigg-2', name: 'Low Rigg - Touring Pitch 2', type: 'pitch' },
  { id: 'low-rigg-3', name: 'Low Rigg - Touring Pitch 3', type: 'pitch' },
  { id: 'low-rigg-4', name: 'Low Rigg - Touring Pitch 4', type: 'pitch' },
  { id: 'low-rigg-5', name: 'Low Rigg - Touring Pitch 5', type: 'pitch' },
  { id: 'low-rigg-6', name: 'Low Rigg - Touring Pitch 6', type: 'pitch' },
  { id: 'low-rigg-7', name: 'Low Rigg - Touring Pitch 7', type: 'pitch' },
  { id: 'low-rigg-8', name: 'Low Rigg - Touring Pitch 8', type: 'pitch' },
  { id: 'low-rigg-9', name: 'Low Rigg - Touring Pitch 9', type: 'pitch' },
  { id: 'low-rigg-10', name: 'Low Rigg - Touring Pitch 10', type: 'pitch' },
  { id: 'low-rigg-11', name: 'Low Rigg - Touring Pitch 11', type: 'pitch' },
  { id: 'low-rigg-12', name: 'Low Rigg - Touring Pitch 12', type: 'pitch' },
  { id: 'low-rigg-13', name: 'Low Rigg - Touring Pitch 13', type: 'pitch' },
  { id: 'low-rigg-14', name: 'Low Rigg - Touring Pitch 14', type: 'pitch' },
  
  // High Rigg - Touring Pitches (15-30)
  { id: 'high-rigg-15', name: 'High Rigg - Touring Pitch 15', type: 'pitch' },
  { id: 'high-rigg-16', name: 'High Rigg - Touring Pitch 16', type: 'pitch' },
  { id: 'high-rigg-17', name: 'High Rigg - Touring Pitch 17', type: 'pitch' },
  { id: 'high-rigg-18', name: 'High Rigg - Touring Pitch 18', type: 'pitch' },
  { id: 'high-rigg-19', name: 'High Rigg - Touring Pitch 19', type: 'pitch' },
  { id: 'high-rigg-20', name: 'High Rigg - Touring Pitch 20', type: 'pitch' },
  { id: 'high-rigg-21', name: 'High Rigg - Touring Pitch 21', type: 'pitch' },
  { id: 'high-rigg-22', name: 'High Rigg - Touring Pitch 22', type: 'pitch' },
  { id: 'high-rigg-23', name: 'High Rigg - Touring Pitch 23', type: 'pitch' },
  { id: 'high-rigg-24', name: 'High Rigg - Touring Pitch 24', type: 'pitch' },
  { id: 'high-rigg-25', name: 'High Rigg - Touring Pitch 25', type: 'pitch' },
  { id: 'high-rigg-26', name: 'High Rigg - Touring Pitch 26', type: 'pitch' },
  { id: 'high-rigg-27', name: 'High Rigg - Touring Pitch 27', type: 'pitch' },
  { id: 'high-rigg-28', name: 'High Rigg - Touring Pitch 28', type: 'pitch' },
  { id: 'high-rigg-29', name: 'High Rigg - Touring Pitch 29', type: 'pitch' },
  { id: 'high-rigg-30', name: 'High Rigg - Touring Pitch 30', type: 'pitch' },
];

export const DELIVERY_SLOTS = [
  '8:30 AM - 8:45 AM',
  '8:45 AM - 9:00 AM',
  '9:00 AM - 9:15 AM',
  '9:15 AM - 9:30 AM',
  '9:30 AM - 9:45 AM',
  '9:45 AM - 10:00 AM',
];
