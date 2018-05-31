import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Category} from '../model/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Observable<Category[]> = Observable.create(null);

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.categories = this.fireStore.collection<Category>('category', ref => ref.orderBy('order')).valueChanges();
  }

}
