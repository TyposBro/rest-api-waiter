import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../state/cart.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {


  @Input() product;
  newProduct;


  constructor(
    private cartService: CartService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.newProduct = Object.assign({}, this.product)
  }

  confirm() {
    if (!(this.newProduct.quantity < 0 || this.newProduct.quantity == 0)) {
      this.newProduct.total = this.newProduct.quantity * this.newProduct.price;
      this.cartService.addToCart(this.newProduct);
      this.popoverController.dismiss(this.newProduct)
    }
  }
  add() {

    this.newProduct.quantity++
    this.newProduct.total = this.newProduct.quantity * this.newProduct.price;
    if (this.newProduct.quantity < 0 || this.newProduct.quantity === 0) {
      this.newProduct.quantity = 1;
      this.newProduct.total = this.newProduct.price;
    }

  }
  remove() {
    this.newProduct.quantity--;
    this.newProduct.total = this.newProduct.quantity * this.newProduct.price;

    if (this.newProduct.quantity < 0 || this.newProduct.quantity === 0) {
      this.newProduct.quantity = 1;
      this.newProduct.total = this.newProduct.price;
    }



  }

}
