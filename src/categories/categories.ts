export const categories = [
  { id: 'clothing', name: 'Baby Clothing' },
  { id: 'newborn', name: 'Newborn Essentials' },
  { id: 'feeding', name: 'Feeding' },
  { id: 'bath-care', name: 'Bath and Care' },
  { id: 'sleep', name: 'Sleep' },
  { id: 'toys', name: 'Toys' },
  { id: 'accessories', name: 'Accessories' },
];

export function getCategoryName(categoryId: string) {
  const category = categories.find((item) => item.id === categoryId);
  return category ? category.name : categoryId;
}
