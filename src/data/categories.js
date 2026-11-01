export const categories = [
  { id: "clothing", name: "Baby Clothing" },
  { id: "newborn", name: "Newborn Essentials" },
  { id: "feeding", name: "Feeding" },
  { id: "bath-care", name: "Bath and Care" },
  { id: "sleep", name: "Sleep" },
  { id: "toys", name: "Toys" },
  { id: "accessories", name: "Accessories" },
];
// Turns a category id (like "bath-care") into its display name ("Bath and Care").
// If the id is unknown, the id itself is returned so nothing ever shows blank.
export function getCategoryName(categoryId) {
  const category = categories.find((item) => item.id === categoryId);
  return category ? category.name : categoryId;
}
