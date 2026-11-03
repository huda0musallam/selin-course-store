import type { Category, Product } from '../products/products.types.ts';
import { products } from '../products/products.ts';
import { addToCart } from '../cart/cart.ts';
import { searchProducts, filterByCategory, sortByPrice } from '../products/filters.ts';
import {
  renderProducts,
  setupProductEvents,
  setupFilterEvents,
  renderCartBadge,
  setupHeroCarousel,
  updateWishlistCount,
  showToast,
} from '../ui/dom.ts';

const FAVORITES_STORAGE_KEY = 'selin-favorites';

function readFavorites(): string[] {
  const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id: unknown): id is string =>
        typeof id === 'string' && products.some((product) => product.id === id),
    );
  } catch {
    return [];
  }
}

let favoriteIds = readFavorites();

function toggleFavorite(productId: string): boolean {
  favoriteIds = favoriteIds.includes(productId)
    ? favoriteIds.filter((id) => id !== productId)
    : [...favoriteIds, productId];
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  updateWishlistCount(favoriteIds.length);
  return favoriteIds.includes(productId);
}

const filterState: {
  searchTerm: string;
  category: Category | 'all';
  sortOrder: 'default' | 'price-asc' | 'price-desc';
} = {
  searchTerm: '',
  category: 'all',
  sortOrder: 'default',
};
function getVisibleProducts(): Product[] {
  const searched = searchProducts(products, filterState.searchTerm.trim());
  const filtered = filterByCategory(searched, filterState.category);
  return sortByPrice(filtered, filterState.sortOrder);
}

function handleAddToCart(productId: string): void {
  const selectedProduct = products.find((product) => product.id === productId);
  if (!selectedProduct) return;

  addToCart(selectedProduct);
  renderCartBadge();
  showToast(`${selectedProduct.name} added to your cart`);
}

export function initHomePage(): void {
  renderProducts(getVisibleProducts(), favoriteIds);
  updateWishlistCount(favoriteIds.length);
  setupHeroCarousel();

  setupFilterEvents((newFilters) => {
    Object.assign(filterState, newFilters);
    renderProducts(getVisibleProducts(), favoriteIds);
  });

  setupProductEvents(handleAddToCart, toggleFavorite);
}
