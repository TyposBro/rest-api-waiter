import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { CartPage } from './cart.page';
import { TranslateModule } from '@ngx-translate/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    //SharedModule
  ],
  declarations: [CartPage, CartItemComponent, ProductViewComponent],
  entryComponents: [ProductViewComponent]
})
export class CartPageModule { }
