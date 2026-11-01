import { products } from "./data/products.js";

// Orders at or above this amount ship free (matches the announcement bar).
export const FREE_SHIPPING_THRESHOLD = 50;

export let cart = [];

export function addToCart(product) {
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

export function decreaseQuantity(productId) {
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

export function removeFromCart(productId) {
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
  localStorage.setItem("selin-cart", JSON.stringify(cart));
}
// Restores the saved cart. Only the id and quantity are trusted from storage;
// name, price, and image always come fresh from products.js, so an old saved
// cart still shows today's details (and items no longer sold are dropped).
export function loadCart() {
  const savedCart = localStorage.getItem("selin-cart");
  if (!savedCart) return;

  try {
    cart = JSON.parse(savedCart)
      .map((savedItem) => {
        const product = products.find((item) => item.id === savedItem.id);
        if (!product) return null;
        return { ...product, quantity: savedItem.quantity };
      })
      .filter((item) => item !== null);
  } catch {
    // Saved data was damaged: start with an empty cart instead of crashing.
    cart = [];
  }
}

// How much more the shopper must spend to get free shipping (0 if they qualify).
export function getAmountUntilFreeShipping() {
  return Math.max(FREE_SHIPPING_THRESHOLD - getCartTotal(), 0);
}

export function increaseQuantity(productId) {
  const existingProduct = cart.find((item) => {
    return item.id === productId;
  });
  if (!existingProduct) return;
  existingProduct.quantity++;

  saveCart();
}
