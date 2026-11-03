import { loadCart } from './cart/cart.ts';
import { getCurrentPage, renderCartBadge } from './ui/dom.ts';
import { initHomePage } from './pages/home.ts';
import { initCartPage } from './cart/cart-page.ts';

loadCart();
renderCartBadge();

const currentPage = getCurrentPage();

if (currentPage === 'home') {
  initHomePage();
} else if (currentPage === 'cart') {
  initCartPage();
}
