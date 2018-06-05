import { Component, OnInit } from '@angular/core';
import {Category} from '../model/category.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Observable<Category[]> = Observable.create(null);

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.categories = this.fireStore.collection<Category>('category', ref => ref.orderBy('order')).valueChanges();
  }
}
