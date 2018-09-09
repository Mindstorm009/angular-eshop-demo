import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../model/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product = new Product();
  id: String;
  images: Array<String> = new Array<String>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const productId = params['prodId'];
          this.id = params['id'];
          console.log(productId);
          return this.productService.getProductById(productId);
        })
      )
      .subscribe((product: Product) => {
        this.product = product;
        this.images = product.images;
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit() {
    console.log('Invoked.');
  }

  updateSelection(e) {
    const elements = document.getElementsByClassName('img-thumbnail');
    const imgElColl: HTMLCollection = document.getElementsByClassName(
      'main-img'
    );
    const imgEl: any = imgElColl[0];
    imgEl.src = this.product.images[e];

    if (e === 1) {
      elements[0].classList.remove('img-thumbnail-selected');
      elements[1].classList.add('img-thumbnail-selected');
      elements[2].classList.remove('img-thumbnail-selected');
    } else if (e === 2) {
      elements[0].classList.remove('img-thumbnail-selected');
      elements[1].classList.remove('img-thumbnail-selected');
      elements[2].classList.add('img-thumbnail-selected');
    } else if (e === 0) {
      elements[0].classList.add('img-thumbnail-selected');
      elements[1].classList.remove('img-thumbnail-selected');
      elements[2].classList.remove('img-thumbnail-selected');
    }
  }

  addToCart() {
    const value = localStorage.getItem(this.product.id);
    if (+value < 10) {
      this.productService.addToLocalStorage(this.product.id);
    }
  }
}
