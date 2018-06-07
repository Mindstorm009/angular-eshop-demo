import {Category} from './category.model';

export class Product {
  category: Category;
  subcategory: string;
  name: string;
  images: string[];
  description: string;
}
