import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelppagePage } from './helppage';

@NgModule({
  declarations: [
    HelppagePage,
  ],
  imports: [
    IonicPageModule.forChild(HelppagePage),
  ],
  exports: [
    HelppagePage
  ]
})
export class HelppagePageModule {}
