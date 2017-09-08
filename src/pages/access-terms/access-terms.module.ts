import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessTermsPage } from './access-terms';

@NgModule({
  declarations: [
    AccessTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessTermsPage),
  ],
  exports: [
    AccessTermsPage
  ]
})
export class AccessTermsPageModule {}
