import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadlistPage } from './uploadlist';

@NgModule({
  declarations: [
    UploadlistPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadlistPage),
  ],
  exports: [
    UploadlistPage
  ]
})
export class UploadlistPageModule {}
