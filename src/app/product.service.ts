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
      .collection<Product>('products', queryFn => queryFn.where('category', '==', category.id))
      .valueChanges();
  }

  getProductsByCategoryAndSubcategory(category: string, subCategory: string): Observable<Product[]> {
    const ref = this.dbStore.doc('category/F5Fok7vmNSNZqirXSbPj').ref;
    return this.dbStore
      .collection<Product>('products', queryFn => queryFn.where('category', '==', category)
                                                                      .where('subcategory', '==', subCategory))
      .valueChanges();
  }

  getProductById(id: String): Observable<Product> {
    return this.dbStore
      .doc<Product>('products/' + id)
      .valueChanges();
  }
}
