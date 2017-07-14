import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninBhalfPage } from './signin-bhalf';

@NgModule({
  declarations: [
    SigninBhalfPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninBhalfPage),
  ],
  exports: [
    SigninBhalfPage
  ]
})
export class SigninBhalfPageModule {}
