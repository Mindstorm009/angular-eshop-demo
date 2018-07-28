import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/index';
import {CategoryService} from '../category.service';
import {switchMap} from 'rxjs/operators';
import {Category} from '../model/category.model';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryId: string = null;
  category: Observable<Category> = Observable.create(new Category());
  products: Observable<any[]> = Observable.create([]);
  id: String = '';

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(switchMap( (params: Params) => {
      this.categoryId = params['id'];
      this.category = this.categoryService.getCategoryById(this.categoryId);
      return this.category;
    })).subscribe((category: Category) => {
      this.id = category.id;
      this.products = this.productService.getProductsByCategory(category);
    });
  }

}
