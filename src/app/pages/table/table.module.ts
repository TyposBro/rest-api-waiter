import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { TablePage } from './table.page';
import { TableItemComponent } from './table-item/table-item.component';

import { TranslateModule } from '@ngx-translate/core';
import { ConfirmPopoverComponent } from './confirm-popover/confirm-popover.component';

const routes: Routes = [
  {
    path: '',
    component: TablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [TablePage, TableItemComponent, ConfirmPopoverComponent],
  entryComponents: [ConfirmPopoverComponent]
})
export class TablePageModule {}
