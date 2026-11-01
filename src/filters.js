export function searchProducts(products, searchTerm) {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}

export function filterByCategory(products, category) {
  if (category === "all") {
    return products;
  }

  return products.filter((product) => {
    return product.categoryId === category;
  });
}

export function sortByPrice(products, sortOrder) {
  const sortedProducts = [...products];

  if (sortOrder === "price-asc") {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "price-desc") {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }
  return sortedProducts;
}
