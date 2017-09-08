import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCheckPage } from './order-check';

@NgModule({
  declarations: [
    OrderCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCheckPage),
  ],
  exports: [
    OrderCheckPage
  ]
})
export class OrderCheckPageModule {}
