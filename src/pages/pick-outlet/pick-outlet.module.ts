import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickOutletPage } from './pick-outlet';

@NgModule({
  declarations: [
    PickOutletPage,
  ],
  imports: [
    IonicPageModule.forChild(PickOutletPage),
  ],
  exports: [
    PickOutletPage
  ]
})
export class PickOutletPageModule {}
