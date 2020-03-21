import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'table-preview',
  templateUrl: './table-preview.component.html',
  styleUrls: ['./table-preview.component.scss'],
})
export class TablePreviewComponent implements OnInit {

  @Input() item: any = {
    tableNumber: 23,
    seat: 2,
    people: 5
  }

  constructor() { }

  ngOnInit() {}

}
