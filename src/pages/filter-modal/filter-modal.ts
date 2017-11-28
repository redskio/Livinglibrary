import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {
  obj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }
  menuClick(value1, value2){
     this.obj = {direction: value1, category: value2};
     this.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss(this.obj);
  }
}
