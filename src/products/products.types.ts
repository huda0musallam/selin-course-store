export type Category =
  'clothing' | 'newborn' | 'feeding' | 'bath-care' | 'sleep' | 'toys' | 'accessories';

export interface Product {
  id: string;
  name: string;
  categoryId: Category;
  price: number;
  image: string;
  imageAlt: string;
}
