import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HistoryItem } from '../model';

@Component({
  selector: 'history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {

  @Input() item: HistoryItem;

  @Output() delete = new EventEmitter<HistoryItem>()

  constructor() { }

  ngOnInit() {
    console.log(this.item);

  }

}
