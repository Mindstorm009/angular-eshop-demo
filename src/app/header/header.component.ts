import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Observable<Category[]> = Observable.create(null);

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }

}
