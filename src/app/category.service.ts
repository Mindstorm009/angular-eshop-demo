import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/index';
import { Category } from './model/category.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private dbStore: AngularFirestore) {}

  getCategories(): Observable<Category[]> {
    return this.dbStore.collection<Category>('category').valueChanges();
  }

  getCategoryById(id: string): Observable<Category> {
    return this.dbStore
      .collection<Category>('category', queryFn =>
        queryFn.where('id', '==', id)
      )
      .valueChanges()
      .pipe(map(cats => cats[0]));
  }
}
