export type CategoryId = 'all' | 'suvs' | 'sedans' | 'hatchbacks' | 'picapes' | 'eletricos';

export interface Category {
  id: CategoryId;
  name: string;
  image: string;
  count: number;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  priceFormatted: string;
  km: number;
  kmFormatted: string;
  transmission: string;
  fuel: string;
  color: string;
  category: CategoryId;
  badges: Array<'IPVA Pago' | 'Único Dono' | 'Garantia de Fábrica'>;
  badgeType?: 'green' | 'orange';
  image: string;
  description: string;
  features: string[];
}

export interface FilterState {
  brand: string;
  model: string;
  year: string;
  priceRange: string;
  category: CategoryId;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  carPurchased: string;
}
