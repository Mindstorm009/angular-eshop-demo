import { CartItem } from './../model/cartitem.model';
import { Product } from './../model/product.model';
import { ProductService } from './../product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: CartItem[] = new Array<CartItem>();
  product: Product;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
   this.getLocalStorageData();
  }

  getLocalStorageData() {
    this.products  = new Array<CartItem>();
    const localProducts: any[] = this.productService.getProductsFromLocalStorage();
    localProducts.forEach((localProduct) => {
      const item: CartItem = new CartItem();
      item.qty = localProduct.value;
      item.id = localProduct.id;
      this.productService.getProductById(localProduct.id).subscribe((data) => {
        item.name = data.name;
        item.price = data.price;

        this.products.push(item);
      });
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.productService.removeFromLocalStorage(cartItem.id);
    this.products = new Array<CartItem>();
  }

  changeQty(cartItem: CartItem, changedQty: Number) {

    cartItem.qty = changedQty;
    this.productService.changeQty(cartItem.id, changedQty);
  }
}
