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

export const ACCOMMODATIONS: Accommodation[] = [
  // VIP Mountain View Cabins
  { id: 'vip-cabin-1', name: 'VIP Mountain View Cabin 1', type: 'cabin' },
  { id: 'vip-cabin-2', name: 'VIP Mountain View Cabin 2', type: 'cabin' },
  { id: 'vip-cabin-3', name: 'VIP Mountain View Cabin 3', type: 'cabin' },
  { id: 'vip-cabin-4', name: 'VIP Mountain View Cabin 4', type: 'cabin' },
  { id: 'vip-cabin-5', name: 'VIP Mountain View Cabin 5', type: 'cabin' },
  { id: 'vip-cabin-6', name: 'VIP Mountain View Cabin 6', type: 'cabin' },
  { id: 'vip-cabin-7', name: 'VIP Mountain View Cabin 7', type: 'cabin' },
  
  // Superior Mountain View Cabins
  { id: 'stickle-tarn', name: 'Stickle Tarn', type: 'cabin' },
  { id: 'styhead-tarn', name: 'Styhead Tarn', type: 'cabin' },
  { id: 'blea-tarn', name: 'Blea Tarn', type: 'cabin' },
  
  // Exclusive Mountain View Cabins
  { id: 'bleaberry-tarn', name: 'Bleaberry Tarn', type: 'cabin' },
  { id: 'easedale-tarn', name: 'Easedale Tarn', type: 'cabin' },
  { id: 'bowscale-tarn', name: 'Bowscale Tarn', type: 'cabin' },
  { id: 'burnmoor-tarn', name: 'Burnmoor Tarn', type: 'cabin' },
  
  // Hardstanding Pitches Only
  { id: 'hardstanding-1', name: 'Hardstanding Pitch 1', type: 'pitch' },
  { id: 'hardstanding-2', name: 'Hardstanding Pitch 2', type: 'pitch' },
  { id: 'hardstanding-3', name: 'Hardstanding Pitch 3', type: 'pitch' },
  { id: 'hardstanding-4', name: 'Hardstanding Pitch 4', type: 'pitch' },
  { id: 'hardstanding-5', name: 'Hardstanding Pitch 5', type: 'pitch' },
];

export const DELIVERY_SLOTS = [
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
];
