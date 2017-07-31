import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderlistPage } from './orderlist';

@NgModule({
  declarations: [
    OrderlistPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderlistPage),
  ],
  exports: [
    OrderlistPage
  ]
})
export class OrderlistPageModule {}
