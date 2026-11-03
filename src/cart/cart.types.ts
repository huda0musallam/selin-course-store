import type { Product } from '../products/products.types.ts';

export interface CartItem extends Product {
  quantity: number;
}

export interface SavedCartItem {
  id: string;
  quantity: number;
}

export type Cart = CartItem[];
