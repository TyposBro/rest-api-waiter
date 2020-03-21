import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderItem } from '../model';


@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {


  @Input() order: (OrderItem);

  @Output()
  edit = new EventEmitter<(OrderItem)>();

  @Output()
  delete = new EventEmitter<(OrderItem)>();

  @Output()
  complete = new EventEmitter<(OrderItem)>();

  constructor() { }

  ngOnInit() { }

}
