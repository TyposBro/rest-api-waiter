import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { OrderPage } from './order.page';
import { TranslateCompiler, TranslateModule } from '@ngx-translate/core';
import { OrderItemComponent } from './order-item/order-item.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),

  ],
  declarations: [OrderPage, OrderItemComponent],
  entryComponents: [OrderItemComponent]
})
export class OrderPageModule { }
