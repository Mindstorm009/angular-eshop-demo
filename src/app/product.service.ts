import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Category } from './model/category.model';
import { Observable } from 'rxjs/index';
import { Product } from './model/product.model';

@Injectable()
export class ProductService {
  constructor(private dbStore: AngularFirestore) {}

  getProductsByCategory(category: Category): Observable<Product[]> {
    return this.dbStore
      .collection<Product>('products', queryFn =>
        queryFn.where('category', '==', category.id)
      )
      .valueChanges();
  }

  getProductsByCategoryAndSubcategory(
    category: string,
    subCategory: string
  ): Observable<Product[]> {
    const ref = this.dbStore.doc('category/F5Fok7vmNSNZqirXSbPj').ref;
    return this.dbStore
      .collection<Product>('products', queryFn =>
        queryFn
          .where('category', '==', category)
          .where('subcategory', '==', subCategory)
      )
      .valueChanges();
  }

  getProductById(id: String): Observable<Product> {
    return this.dbStore.doc<Product>('products/' + id).valueChanges();
  }

  getProductsFromLocalStorage() {
    const products = [];
    for (let i = 0, len = localStorage.length; i < len; ++i) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      const product = {
        id: key,
        value: value
      };

      products.push(product);
    }
    return products;
  }

  remove(id: string) {
    const count = localStorage.getItem(id);
    let numCount = Number.parseInt(count);
    if (numCount > 1) {
      numCount--;
      localStorage.setItem(id, numCount.toString());
    } else {
      localStorage.removeItem(id);
    }
  }

  addToLocalStorage(id: string) {
    const product = localStorage.getItem(id);
    if (product) {
      let count = Number.parseInt('1');
      localStorage.setItem(id, (count++).toFixed());
    } else {
      localStorage.setItem(id, '1');
    }
  }
}
