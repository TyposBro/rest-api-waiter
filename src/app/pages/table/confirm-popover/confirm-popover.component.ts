import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableItem } from '../model';
import { PopoverController } from '@ionic/angular';
import { OrderService } from '../../order/state/order.service';
import { createEmptyOrderItem } from '../../order/model';
@Component({
  selector: 'confirm-popover',
  templateUrl: './confirm-popover.component.html',
  styleUrls: ['./confirm-popover.component.scss'],
})
export class ConfirmPopoverComponent implements OnInit {

  @Input() tableItem: TableItem;
  @Output() onConfirm = new EventEmitter<any>();

  seatNo: number = 1;
  pax: number = 1;

  constructor(
    public popoverCtrl: PopoverController,
    private orderService: OrderService
  ) { }

  ngOnInit() { }

  async confirm() {
    let newItem = Object.assign({}, createEmptyOrderItem(), {
      userId: '',
      tableId: this.tableItem.id,
      status: 'confirmed',
      pax: this.pax,
    });

    this.orderService.addItem(newItem);
    this.orderService.setActive(newItem);
    return await this.popoverCtrl.dismiss({
      status: 'confirmed'
    })
  }

}
