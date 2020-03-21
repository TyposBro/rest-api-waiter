import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableItem } from '../model';

@Component({
  selector: 'table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent implements OnInit {

  @Input() item: TableItem;

  @Output() onSelect = new EventEmitter<TableItem>();

  btnClass: string;
  time = Date()

  constructor() { }

  ngOnInit() {
    if (this.item.status !== 'available') {
      this.btnClass = ' w3-btn w3-button w3-red w3-round-large';
    }
    else {
      this.btnClass = ' w3-btn w3-button w3-round-large w3-lime';
    }
  }

}
