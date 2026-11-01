// cart-page.js — everything the Cart page does: show the cart and react to
// +, −, Remove, and Clear cart. It changes the cart through cart.js and
// redraws the page through dom.js.

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../cart.js";
import { renderCart, renderCartBadge, setupCartEvents } from "../dom.js";

// Redraws both the cart page and the header badge so they always match.
function refreshCart() {
  renderCart();
  renderCartBadge();
}

// Starts the Cart page. Called once from main.js.
export function initCartPage() {
  renderCart();

  setupCartEvents({
    onIncrease: (productId) => {
      increaseQuantity(productId);
      refreshCart();
    },
    onDecrease: (productId) => {
      decreaseQuantity(productId);
      refreshCart();
    },
    onRemove: (productId) => {
      removeFromCart(productId);
      refreshCart();
    },
    onClear: () => {
      clearCart();
      refreshCart();
    },
  });
}
