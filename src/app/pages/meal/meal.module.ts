import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { MealPage } from './meal.page';
import { TranslateModule } from '@ngx-translate/core';
import { MealItemComponent } from './meal-item/meal-item.component';
import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MealPage
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
  declarations: [MealPage, MealItemComponent]
})
export class MealPageModule {}
