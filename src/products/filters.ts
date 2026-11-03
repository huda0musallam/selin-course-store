import type { Product, Category } from './products.types.ts';

export function searchProducts(products: Product[], searchTerm: string): Product[] {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}

export function filterByCategory(products: Product[], category: Category | 'all'): Product[] {
  if (category === 'all') {
    return products;
  }

  return products.filter((product) => {
    return product.categoryId === category;
  });
}

export function sortByPrice(
  products: Product[],
  sortOrder: 'default' | 'price-asc' | 'price-desc',
): Product[] {
  const sortedProducts = [...products];

  if (sortOrder === 'price-asc') {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === 'price-desc') {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
}
