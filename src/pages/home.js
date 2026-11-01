// home.js — everything the Home page does: show products, filter them,
// and add them to the cart. It never touches the page directly; it asks dom.js.

import { products } from "../data/products.js";
import { addToCart } from "../cart.js";
import { searchProducts, filterByCategory, sortByPrice } from "../filters.js";
import {
  renderProducts,
  setupProductEvents,
  setupFilterEvents,
  renderCartBadge,
  showToast,
} from "../dom.js";

// The current choices in the search box and the two dropdowns.
const filterState = {
  searchTerm: "",
  category: "all",
  sortOrder: "default",
};

// Runs search → category → sort, in that order, on the ORIGINAL product list.
// Because we always start from the original list, "Default" sorting
// gives back the original order.
function getVisibleProducts() {
  const searched = searchProducts(products, filterState.searchTerm.trim());
  const filtered = filterByCategory(searched, filterState.category);
  return sortByPrice(filtered, filterState.sortOrder);
}

function handleAddToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);
  if (!selectedProduct) return;

  addToCart(selectedProduct);
  renderCartBadge();
  showToast(`${selectedProduct.name} added to your cart`);
}

// Starts the Home page. Called once from main.js.
export function initHomePage() {
  renderProducts(getVisibleProducts());

  setupFilterEvents((newFilters) => {
    Object.assign(filterState, newFilters);
    renderProducts(getVisibleProducts());
  });

  setupProductEvents(handleAddToCart);
}
