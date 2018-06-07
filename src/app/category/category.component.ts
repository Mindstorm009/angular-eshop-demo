import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
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

  products: Observable<any[]> = Observable.create([]);

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(switchMap( (params: Params) => {
      const catId = params['id'];
      return this.categoryService.getCategoryById(catId);
    })).subscribe((category: Category) => {
      console.log(category);
      this.products = this.productService.getProductsByCategory(category);
    });
  }

}
