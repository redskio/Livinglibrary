import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { outletPage } from './../outlet/outlet';
import { OutletService } from './../../providers/outlet.service';


import { Outlet } from './../../models/outlet.model';

declare var google;

@Component({
  selector: 'outletList-page',
  templateUrl: 'outlet_list.html'
})
export class outletListPage {

	outlet: FirebaseListObservable<Outlet[]>;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public events: Events,
		public outletService: OutletService
		) {

 	}

 	ionViewDidLoad() {
		this.outlet = this.outletService.outlet;
  	}

 	getOutlet(outlets){
    this.navCtrl.push(outletPage, {
      outletInfo: outlets
    });
 	}

 	closeModal(): void{
 		this.viewCtrl.dismiss();
	}

}
