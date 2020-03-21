import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../model';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  @Input() item: MenuItem;

  @Output() onSelect = new EventEmitter<MenuItem>();

  constructor() { }

  ngOnInit() { }

}
