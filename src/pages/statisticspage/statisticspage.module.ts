import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticspagePage } from './statisticspage';

@NgModule({
  declarations: [
    StatisticspagePage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticspagePage),
  ],
  exports: [
    StatisticspagePage
  ]
})
export class StatisticspagePageModule {}
