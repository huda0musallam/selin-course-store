import type { Product } from '../products/products.types.ts';
import type { Cart, SavedCartItem } from './cart.types.ts';
import { products } from '../products/products.ts';

export const FREE_SHIPPING_THRESHOLD = 50;

export let cart: Cart = [];

export function addToCart(product: Product) {
  const existingProduct = cart.find((item) => {
    return item.id === product.id;
  });

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  saveCart();
}

export function decreaseQuantity(productId: string) {
  const existingProduct = cart.find((item) => {
    return item.id === productId;
  });

  if (!existingProduct) return;
  if (existingProduct.quantity > 1) {
    existingProduct.quantity--;
  } else {
    cart = cart.filter((item) => item.id !== productId);
  }
  saveCart();
}

export function removeFromCart(productId: string) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
}
export function clearCart() {
  cart = [];
  saveCart();
}

export function getCartCount() {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

export function getCartTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export function saveCart() {
  localStorage.setItem('selin-cart', JSON.stringify(cart));
}

export function loadCart() {
  const savedCart = localStorage.getItem('selin-cart');
  if (!savedCart) return;

  try {
    const parsedCart: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      cart = [];
      return;
    }

    cart = parsedCart
      .map((savedItem: SavedCartItem) => {
        const product = products.find((item) => item.id === savedItem.id);

        if (!product) return null;

        return {
          ...product,
          quantity: savedItem.quantity,
        };
      })
      .filter((item) => item !== null);
  } catch {
    cart = [];
  }
}

export function getAmountUntilFreeShipping() {
  return Math.max(FREE_SHIPPING_THRESHOLD - getCartTotal(), 0);
}

export function increaseQuantity(productId: string) {
  const existingProduct = cart.find((item) => {
    return item.id === productId;
  });
  if (!existingProduct) return;
  existingProduct.quantity++;

  saveCart();
}
