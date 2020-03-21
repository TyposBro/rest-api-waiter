import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MealItem } from '../../meal/model';
import { CartItem } from '../model';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {


  @Input() item: (MealItem & CartItem);

  @Output()
  edit = new EventEmitter<(MealItem & CartItem)>();

  @Output()
  delete = new EventEmitter<(MealItem & CartItem)>();


  ngOnInit() {
  }
}
