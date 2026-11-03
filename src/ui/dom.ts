import type { Category, Product } from '../products/products.types.ts';
import type { CartItem } from '../cart/cart.types.ts';

import {
  cart,
  getCartCount,
  getCartTotal,
  getAmountUntilFreeShipping,
  FREE_SHIPPING_THRESHOLD,
} from '../cart/cart.ts';
import { getCategoryName } from '../categories/categories.ts';
import { formatPrice } from '../utils/format.ts';

const TOAST_DURATION_MS = 2500;
const PERCENT = 100;
let toastTimerId: ReturnType<typeof setTimeout> | undefined;
if (toastTimerId !== undefined) {
  clearTimeout(toastTimerId);
}

function isCategory(value: string): value is Category | 'all' {
  return [
    'all',
    'clothing',
    'newborn',
    'feeding',
    'bath-care',
    'sleep',
    'toys',
    'accessories',
  ].includes(value);
}

function isSortOrder(value: string): value is 'default' | 'price-asc' | 'price-desc' {
  return ['default', 'price-asc', 'price-desc'].includes(value);
}

function formatItemCount(count: number): string {
  return `${count} ${count === 1 ? 'item' : 'items'}`;
}

export function getCurrentPage(): string | undefined {
  return document.body.dataset.page;
}

export function renderCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('[data-cart-count]').forEach((badge) => {
    badge.textContent = String(count);
  });
}

function createProductCard(product: Product, isFavorite: boolean): string {
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
        <span class="product-card__actions">
          <button type="button" class="product-icon-button add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 8h14l-.8 11.2a2 2 0 0 1-2 1.8H7.8a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg></button>
          <button type="button" class="product-icon-button favorite-button${isFavorite ? ' is-favorite' : ''}" data-id="${product.id}" data-product-name="${product.name}" aria-label="${isFavorite ? 'Remove' : 'Add'} ${product.name} ${isFavorite ? 'from' : 'to'} wishlist" aria-pressed="${isFavorite}"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 8.8c0 5-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z"/></svg></button>
        </span>
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${getCategoryName(product.categoryId)}</p>
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__price">${formatPrice(product.price)}</p>
      </div>
    </article>`;
}

export function renderProducts(products: Product[], favoriteIds: string[] = []): void {
  const productGrid = document.getElementById('product-grid');
  const bestSellersGrid = document.getElementById('best-sellers-grid');
  const emptyMessage = document.getElementById('products-empty');
  const resultsCount = document.getElementById('results-count');
  if (!productGrid || !bestSellersGrid || !emptyMessage || !resultsCount) {
    return;
  }
  const renderCard = (product: Product): string =>
    createProductCard(product, favoriteIds.includes(product.id));
  productGrid.innerHTML = products.slice(0, 4).map(renderCard).join('');
  bestSellersGrid.innerHTML = products.slice(4).map(renderCard).join('');
  emptyMessage.hidden = products.length > 0;
  resultsCount.textContent = `Showing ${products.length} ${
    products.length === 1 ? 'product' : 'products'
  }`;
}

export function setupProductEvents(
  onAddToCart: (productId: string) => void,
  onToggleFavorite: (productId: string) => boolean,
): void {
  document.querySelectorAll('.product-grid').forEach((productGrid) => {
    productGrid.addEventListener('click', (event) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const button = target.closest<HTMLButtonElement>('button[data-id]');
      if (!button) return;
      const productId = button.dataset.id;
      if (!productId) return;
      if (button.classList.contains('favorite-button')) {
        const isFavorite = onToggleFavorite(productId);
        button.setAttribute('aria-pressed', String(isFavorite));
        button.setAttribute(
          'aria-label',
          `${isFavorite ? 'Remove' : 'Add'} ${button.dataset.productName ?? 'product'} ${isFavorite ? 'from' : 'to'} wishlist`,
        );
        button.classList.toggle('is-favorite', isFavorite);
      } else {
        onAddToCart(productId);
      }
    });
  });
}

export function updateWishlistCount(count: number): void {
  document.querySelectorAll<HTMLElement>('[data-wishlist-count]').forEach((badge) => {
    badge.textContent = String(count);
    badge.hidden = count === 0;
  });
}

export function setupHeroCarousel(): void {
  const slides = Array.from(document.querySelectorAll<HTMLImageElement>('[data-slide]'));
  const indicators = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-slide-to]'));
  const pauseButton = document.querySelector<HTMLButtonElement>('[data-slide-pause]');
  if (slides.length < 2 || indicators.length !== slides.length || !pauseButton) return;

  let activeIndex = 0;
  let isPaused = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const showSlide = (nextIndex: number): void => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('is-active', index === activeIndex));
    indicators.forEach((indicator, index) => {
      if (index === activeIndex) indicator.setAttribute('aria-current', 'true');
      else indicator.removeAttribute('aria-current');
    });
  };

  indicators.forEach((indicator, index) =>
    indicator.addEventListener('click', () => showSlide(index)),
  );
  pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute(
      'aria-label',
      isPaused ? 'Resume automatic slides' : 'Pause automatic slides',
    );
    pauseButton.setAttribute('aria-pressed', String(isPaused));
  });
  window.setInterval(() => {
    if (!isPaused && !reducedMotion.matches) showSlide(activeIndex + 1);
  }, 5000);
}

export function setupFilterEvents(
  onFiltersChange: (filters: {
    searchTerm: string;
    category: Category | 'all';
    sortOrder: 'default' | 'price-asc' | 'price-desc';
  }) => void,
): void {
  const searchInput = document.getElementById('search-input');
  const categorySelect = document.getElementById('category-select');
  const sortSelect = document.getElementById('sort-select');
  if (
    !(searchInput instanceof HTMLInputElement) ||
    !(categorySelect instanceof HTMLSelectElement) ||
    !(sortSelect instanceof HTMLSelectElement)
  ) {
    return;
  }
  function sendCurrentFilters() {
    if (
      !(searchInput instanceof HTMLInputElement) ||
      !(categorySelect instanceof HTMLSelectElement) ||
      !(sortSelect instanceof HTMLSelectElement)
    ) {
      return;
    }
    const category = categorySelect.value;
    const sortOrder = sortSelect.value;
    if (!isCategory(category) || !isSortOrder(sortOrder)) return;
    onFiltersChange({
      searchTerm: searchInput.value,
      category,
      sortOrder,
    });
  }

  searchInput.addEventListener('input', sendCurrentFilters);
  categorySelect.addEventListener('change', sendCurrentFilters);
  sortSelect.addEventListener('change', sendCurrentFilters);

  document.querySelectorAll<HTMLElement>('[data-category]').forEach((link) => {
    link.addEventListener('click', () => {
      const category = link.dataset.category;

      if (!category || !isCategory(category)) return;

      categorySelect.value = category;
      sendCurrentFilters();
    });
  });
}

export function showToast(message: string): void {
  const toast = document.getElementById('cart-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toastTimerId);
  toastTimerId = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, TOAST_DURATION_MS);
}

function createCartItem(item: CartItem): string {
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

export function renderCart(): void {
  const cartItems = document.getElementById('cart-items');
  const cartContent = document.getElementById('cart-content');
  const emptyMessage = document.getElementById('cart-empty');
  const cartCount = document.getElementById('cart-count');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartShipping = document.getElementById('cart-shipping');
  const cartTotal = document.getElementById('cart-total');
  const shippingMessage = document.getElementById('shipping-message');
  const shippingProgress = document.getElementById('shipping-progress');

  const isEmpty = cart.length === 0;
  const total = getCartTotal();
  const amountLeft = getAmountUntilFreeShipping();
  if (
    !cartItems ||
    !emptyMessage ||
    !cartContent ||
    !cartCount ||
    !cartSubtotal ||
    !cartShipping ||
    !cartTotal ||
    !shippingMessage ||
    !shippingProgress
  )
    return;

  cartItems.innerHTML = cart.map(createCartItem).join('');
  emptyMessage.hidden = !isEmpty;
  cartContent.hidden = isEmpty;

  cartCount.textContent = formatItemCount(getCartCount());
  cartSubtotal.textContent = formatPrice(total);
  cartShipping.textContent = amountLeft === 0 ? 'Free' : 'Calculated at checkout';
  cartTotal.textContent = formatPrice(total);

  shippingMessage.textContent =
    amountLeft === 0
      ? "You've unlocked free shipping!"
      : `Add ${formatPrice(amountLeft)} more for free shipping.`;

  const progressPercent = Math.min(total / FREE_SHIPPING_THRESHOLD, 1) * PERCENT;
  shippingProgress.style.width = `${progressPercent}%`;
}

export function setupCartEvents(callbacks: {
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
}) {
  const cartItems = document.getElementById('cart-items');
  const clearButton = document.getElementById('clear-cart');
  const cartHeading = document.getElementById('cart-heading');
  if (!cartItems || !clearButton || !(cartHeading instanceof HTMLElement)) {
    return;
  }
  cartItems.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    const button = target.closest<HTMLButtonElement>('button');

    if (!button) return;

    const productId = button.dataset.id;
    if (!productId) return;
    let actionClass = '';

    if (button.classList.contains('increase-quantity')) {
      actionClass = 'increase-quantity';
      callbacks.onIncrease(productId);
    } else if (button.classList.contains('decrease-quantity')) {
      actionClass = 'decrease-quantity';
      callbacks.onDecrease(productId);
    } else if (button.classList.contains('remove-item')) {
      callbacks.onRemove(productId);
    }

    const sameButton = actionClass
      ? cartItems.querySelector<HTMLButtonElement>(`.${actionClass}[data-id="${productId}"]`)
      : null;

    if (sameButton) {
      sameButton.focus();
    } else {
      cartHeading.focus();
    }
  });

  clearButton.addEventListener('click', () => {
    callbacks.onClear();
    cartHeading.focus();
  });
}
