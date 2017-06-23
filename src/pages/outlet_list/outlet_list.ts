import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import firebase from 'firebase';

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
		public modalCtrl: ModalController,
		public outletService: OutletService 
		) {
 		
 	}
 	
 	ionViewDidLoad() {
		this.outlet = this.outletService.outlet;
  	}
 	
 	getOutlet(i, outlets){
 		console.log(outlets);
 		let data = {
 			title: outlets.title,
 			latitude: outlets.latitude,
 			longitude: outlets.longitude
 		}
 		this.navCtrl.push(outletPage, data);
 	}
 	
 	onMap1() {
 		let testModal = this.modalCtrl.create(outletPage, {
			title: "paju",
			latitude: "37.769191",
			longitude: "126.698399"
		});
 		testModal.present();
 	}
 	
 	closeModal(): void{
 		this.viewCtrl.dismiss();
	}
 
}	