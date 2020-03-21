import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [MenuPage, MenuItemComponent]
})
export class MenuPageModule {}
