import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MealItem } from '../model';
import { CartItem } from '../../cart/model';

@Component({
  selector: 'meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})
export class MealItemComponent implements OnInit, OnDestroy {

  @Input() item: (MealItem & CartItem);
  @Output() onSelect = new EventEmitter<MealItem & CartItem>();

  cartItem: (MealItem & CartItem);

  constructor() { }

  ionViewWillEnter() {

  }

  ionViewDidLeave() {

  }

  ngOnInit() {
    // console.log(this.item);
    let _quantity = 1;

    if (this.item.quantity) {
      _quantity = this.item.quantity
    }

    this.cartItem = {
      mealId: this.item.id,
      quantity: _quantity,
      total: _quantity * this.item.price,
      title: this.item.title,
      description: this.item.description,
      price: this.item.price,
      imgUrl: this.item.imgUrl,
      menuId: this.item.menuId,
      id: this.item.id
    }
  }

  ngOnDestroy() {
    //this.cartItem = null;
    // this.item = null;
  }

  inceaseByOne() {
    ++this.cartItem.quantity;
    this.cartItem.total = this.cartItem.quantity * this.item.price;
  }

  decreaseByOne() {
    (this.cartItem.quantity > 1) ? --this.cartItem.quantity : null;
    this.cartItem.total = this.cartItem.quantity * this.item.price
  }

}
