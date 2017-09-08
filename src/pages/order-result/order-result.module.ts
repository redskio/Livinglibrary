import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderResultPage } from './order-result';

@NgModule({
  declarations: [
    OrderResultPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderResultPage),
  ],
  exports: [
    OrderResultPage
  ]
})
export class OrderResultPageModule {}
