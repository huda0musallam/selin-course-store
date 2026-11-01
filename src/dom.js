// dom.js — the ONLY file that reads or changes the page (the DOM).
// Other modules decide WHAT should happen; this file decides HOW it looks.

import {
  cart,
  getCartCount,
  getCartTotal,
  getAmountUntilFreeShipping,
  FREE_SHIPPING_THRESHOLD,
} from "./cart.js";
import { getCategoryName } from "./data/categories.js";
import { formatPrice } from "./format.js";

// How long the "Added to cart" message stays on screen (milliseconds).
const TOAST_DURATION_MS = 2500;
const PERCENT = 100;

let toastTimerId = null;

// Turns a number into "1 item" / "3 items".
function formatItemCount(count) {
  return `${count} ${count === 1 ? "item" : "items"}`;
}

// ---------- Shared (every page) ----------

// Reads which page we are on from <body data-page="...">.
export function getCurrentPage() {
  return document.body.dataset.page;
}

// Updates the little number bubble next to "Cart" in the header.
export function renderCartBadge() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
  });
}

// ---------- Home page: products ----------

// Builds one product card's HTML from a product object.
function createProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-card__media">
        <img
          class="product-card__image"
          src="${product.image}"
          alt="${product.imageAlt}"
          width="600"
          height="450"
          loading="lazy"
        />
        <p class="product-card__category">${getCategoryName(product.categoryId)}</p>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__price">${formatPrice(product.price)}</p>
        <button
          type="button"
          class="button button--primary product-card__add add-to-cart"
          data-id="${product.id}"
          aria-label="Add ${product.name} to cart"
        >
          Add to cart
        </button>
      </div>
    </article>`;
}

// Shows the given products as cards, plus the result count / empty message.
export function renderProducts(products) {
  const productGrid = document.getElementById("product-grid");
  const emptyMessage = document.getElementById("products-empty");
  const resultsCount = document.getElementById("results-count");

  productGrid.innerHTML = products.map(createProductCard).join("");
  emptyMessage.hidden = products.length > 0;
  resultsCount.textContent = `Showing ${products.length} ${
    products.length === 1 ? "product" : "products"
  }`;
}

// One click listener on the whole grid handles every "Add to cart" button.
export function setupProductEvents(onAddToCart) {
  const productGrid = document.getElementById("product-grid");
  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;
    const productId = button.dataset.id;
    onAddToCart(productId);
  });
}

// Watches the search box and the two dropdowns. Whenever one changes,
// it sends ALL three current values, so they always work together.
export function setupFilterEvents(onFiltersChange) {
  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-select");
  const sortSelect = document.getElementById("sort-select");

  function sendCurrentFilters() {
    onFiltersChange({
      searchTerm: searchInput.value,
      category: categorySelect.value,
      sortOrder: sortSelect.value,
    });
  }

  searchInput.addEventListener("input", sendCurrentFilters);
  categorySelect.addEventListener("change", sendCurrentFilters);
  sortSelect.addEventListener("change", sendCurrentFilters);
}

// Shows a short message (e.g. "Added to cart") that fades away by itself.
export function showToast(message) {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimerId);
  toastTimerId = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, TOAST_DURATION_MS);
}

// ---------- Cart page ----------

// Builds one cart row's HTML from a cart item.
function createCartItem(item) {
  return `
    <li class="cart-item">
      <img
        class="cart-item__image"
        src="${item.image}"
        alt="${item.imageAlt}"
        width="120"
        height="120"
      />
      <div class="cart-item__info">
        <p class="cart-item__category">${getCategoryName(item.categoryId)}</p>
        <h3 class="cart-item__name">${item.name}</h3>
        <p class="cart-item__price">${formatPrice(item.price)} each</p>
      </div>
      <div class="cart-item__actions">
        <div class="cart-item__quantity" role="group" aria-label="Quantity of ${item.name}">
          <button
            type="button"
            class="cart-item__button decrease-quantity"
            data-id="${item.id}"
            aria-label="Decrease quantity of ${item.name}"
          >−</button>
          <span class="cart-item__amount">${item.quantity}</span>
          <button
            type="button"
            class="cart-item__button increase-quantity"
            data-id="${item.id}"
            aria-label="Increase quantity of ${item.name}"
          >+</button>
        </div>
        <p class="cart-item__line-total">${formatPrice(item.price * item.quantity)}</p>
        <button
          type="button"
          class="cart-item__remove remove-item"
          data-id="${item.id}"
          aria-label="Remove ${item.name} from cart"
        >Remove</button>
      </div>
    </li>`;
}

// Draws the whole cart page: item rows, summary numbers, and empty state.
export function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartContent = document.getElementById("cart-content");
  const emptyMessage = document.getElementById("cart-empty");
  const cartCount = document.getElementById("cart-count");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartShipping = document.getElementById("cart-shipping");
  const cartTotal = document.getElementById("cart-total");
  const shippingMessage = document.getElementById("shipping-message");
  const shippingProgress = document.getElementById("shipping-progress");

  const isEmpty = cart.length === 0;
  const total = getCartTotal();
  const amountLeft = getAmountUntilFreeShipping();

  cartItems.innerHTML = cart.map(createCartItem).join("");
  emptyMessage.hidden = !isEmpty;
  cartContent.hidden = isEmpty;

  cartCount.textContent = formatItemCount(getCartCount());
  cartSubtotal.textContent = formatPrice(total);
  cartShipping.textContent = amountLeft === 0 ? "Free" : "Calculated at checkout";
  cartTotal.textContent = formatPrice(total);

  shippingMessage.textContent =
    amountLeft === 0
      ? "You've unlocked free shipping!"
      : `Add ${formatPrice(amountLeft)} more for free shipping.`;

  const progressPercent = Math.min(total / FREE_SHIPPING_THRESHOLD, 1) * PERCENT;
  shippingProgress.style.width = `${progressPercent}%`;
}

// One click listener on the cart list handles +, −, and Remove for every row.
// After the list is redrawn, focus goes back to the same button so keyboard
// users don't lose their place.
export function setupCartEvents(callbacks) {
  const cartItems = document.getElementById("cart-items");
  const clearButton = document.getElementById("clear-cart");
  const cartHeading = document.getElementById("cart-heading");

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const productId = button.dataset.id;
    let actionClass = "";

    if (button.classList.contains("increase-quantity")) {
      actionClass = "increase-quantity";
      callbacks.onIncrease(productId);
    } else if (button.classList.contains("decrease-quantity")) {
      actionClass = "decrease-quantity";
      callbacks.onDecrease(productId);
    } else if (button.classList.contains("remove-item")) {
      callbacks.onRemove(productId);
    }

    const sameButton = actionClass
      ? cartItems.querySelector(`.${actionClass}[data-id="${productId}"]`)
      : null;

    if (sameButton) {
      sameButton.focus();
    } else {
      cartHeading.focus();
    }
  });

  clearButton.addEventListener("click", () => {
    callbacks.onClear();
    cartHeading.focus();
  });
}
