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
  // Cabins
  { id: 'low-rigg-view', name: 'Low Rigg View', type: 'cabin' },
  { id: 'high-rigg-view', name: 'High Rigg View', type: 'cabin' },
  { id: 'tewet-campfield', name: 'Tewet Campfield', type: 'cabin' },
  { id: 'skiddaw-campfield', name: 'Skiddaw Campfield', type: 'cabin' },
  { id: 'blease-campfield', name: 'Blease Campfield', type: 'cabin' },
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
