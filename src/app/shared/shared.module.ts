import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TablePreviewComponent } from './components/table-preview/table-preview.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [TablePreviewComponent],
  exports: [TablePreviewComponent]
})
export class SharedModule { }
