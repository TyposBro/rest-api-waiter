import { Component, OnInit } from '@angular/core';
import { TableService } from './state/table.service';
import { Observable } from 'rxjs';
import { TableItem } from './model';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ConfirmPopoverComponent } from './confirm-popover/confirm-popover.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'table-page',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

  tableItems$: Observable<TableItem[]>;


  constructor(
    public popoverCtrl: PopoverController,
    public router: Router,
    private tableService: TableService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.tableItems$ = this.tableService.httpLoad();

    // ******** For Testing Purposes ******** 
    this.tableService.httpLoad().subscribe(items => {
      console.log(items);
    });
    // ******** For Testing Purposes ******** 

    this.tableItems$ = this.tableService.selectAllByFilters();
  }

  selectTable(tableItem: TableItem) {
    this.tableService.setActive(tableItem);
    this.presentPopover(tableItem)
  }

  foo() { }

  async presentPopover(tableItem: TableItem) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmPopoverComponent,
      translucent: true,
      componentProps: {
        tableItem
      },
    });

    popover.onDidDismiss().then(res => {
      const { status } = res.data;
      if (status === 'confirmed') {
        // this.tableService.confirm()
        this.router.navigateByUrl("/menu");
      }
    })

    return await popover.present();
  }


}
