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

  getProductsById(id: String): Observable<Product[]> {
    return this.dbStore
      .collection<Product>('products', queryFn =>
        queryFn.where('id', '==', id)
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

  changeQty(id: string, qty: Number) {
    if (qty > 0) {
      localStorage.setItem(id, qty.toFixed());
    } else {
      localStorage.removeItem(id);
    }
  }

  removeFromLocalStorage(id: string) {
    localStorage.removeItem(id);
  }

  addToLocalStorage(id: string) {
    const product = localStorage.getItem(id);
    if (product) {
      let count = Number.parseInt(product);
      count++;
      localStorage.setItem(id, count.toFixed());
    } else {
      localStorage.setItem(id, '1');
    }
  }
}
