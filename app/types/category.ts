import { SubCategory } from '@/app/types/subcategory';
export interface Category {
  category_id: number;
  category_name: string;
  category_image?: string;
  description?: string;
  subcategories: SubCategory[];
}