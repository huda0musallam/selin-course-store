import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from './cart.ts';
import { renderCart, renderCartBadge, setupCartEvents } from '../ui/dom.ts';

function refreshCart() {
  renderCart();
  renderCartBadge();
}

export function initCartPage() {
  renderCart();

  setupCartEvents({
    onIncrease: (productId: string) => {
      increaseQuantity(productId);
      refreshCart();
    },
    onDecrease: (productId: string) => {
      decreaseQuantity(productId);
      refreshCart();
    },
    onRemove: (productId: string) => {
      removeFromCart(productId);
      refreshCart();
    },
    onClear: () => {
      clearCart();
      refreshCart();
    },
  });
}
