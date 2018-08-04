import { Product } from './../model/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productObs: Observable<Product>  = Observable.create(new Product());
  product: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
  }

}
