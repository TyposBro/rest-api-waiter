import { Component, OnInit } from '@angular/core';
import { OrderService } from './state/order.service';
import { Observable } from 'rxjs';
import { OrderItem } from './model';
import { HistoryService } from '../history/state/history.service';
import { Router } from '@angular/router';
import { CartService } from '../cart/state/cart.service';
import { CartItem } from '../cart/model';
import { MealItem } from '../meal/model';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orders$: Observable<OrderItem[]>

  constructor(
    private orderService: OrderService,
    private historyService: HistoryService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectOrders().subscribe(
      elem => {
        console.log(elem);

      }
    );
  }

  selectOrders() {
    this.orders$ = this.orderService.selectAll();
    return this.orders$
  }

  deleteOrder(order: OrderItem) {
    this.orderService.removeItem(order);
    this.router.navigateByUrl('/home')
  }

  editOrder(order: OrderItem) {
    for (let i = 0; i < order.items.length; i++) {
      // console.log(order.items[i]);
      this.cartService.addToCart(order.items[i]);
      this.router.navigateByUrl('/cart')
    }

  }

  completeOrder(order: OrderItem) {
    this.historyService.addToHistory(order);
    this.orderService.removeItem(order)
    this.router.navigateByUrl('/history')
  }

}
