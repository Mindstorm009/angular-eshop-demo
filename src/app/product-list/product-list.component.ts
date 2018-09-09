import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { Product } from '../model/product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';
import { Category, SubCategory } from '../model/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Observable<Product[]>;
  isComponent: Boolean = true;
  categoryId: string = null;
  subCategoryId: string = null;
  category: Observable<Category> = Observable.create(new Category());
  subCategory: SubCategory = new SubCategory();

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    if (!this.products) {
      this.activatedRoute.params
        .pipe(
          switchMap((params: Params) => {
            this.categoryId = params['id'];
            this.subCategoryId = params['subCatId'];
            this.category = this.categoryService.getCategoryById(
              this.categoryId
            );

            return this.category;
          })
        )
        .subscribe(
          (category: Category) => {
            if (!category.subcategories) {
              category.subcategories.forEach(sc => {
                console.log(sc);
                if (sc.id === this.subCategoryId) {
                  this.subCategory = sc;
                }
              });
            }

            this.isComponent = false;
            this.products = this.productService.getProductsByCategoryAndSubcategory(
              this.categoryId,
              this.subCategoryId
            );
          },
          err => console.log('Error ' + err)
        );
    }
  }
}
