import { Component, OnInit } from '@angular/core';
import {Category} from '../model/category.model';
import {Observable} from 'rxjs/index';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Observable<Category[]> = Observable.create(null);

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }
}
