import {Category} from './category.model';

export class Product {
  id: string;
  category: Category;
  subcategory: string;
  name: string;
  images: string[] = ['../../assets/spinner.gif', '../../assets/spinner.gif', '../../assets/spinner.gif'];
  description: string;
  price: Number;
  rating: Number;
  stock: String;
  color: String;
}
