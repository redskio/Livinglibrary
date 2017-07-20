import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPasswordPage } from './find-password';

@NgModule({
  declarations: [
    FindPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPasswordPage),
  ],
  exports: [
    FindPasswordPage
  ]
})
export class FindPasswordPageModule {}
