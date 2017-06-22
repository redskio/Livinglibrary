import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController, Events, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { outletPage } from './../outlet/outlet';
declare var google;
 
@Component({
  selector: 'outletList-page',
  templateUrl: 'outlet_list.html'
})
export class outletListPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public modalCtrl: ModalController) {
 
 	}
 	
 	onMap1() {

		let data = {
			title: "paju",
			latitude: "37.769191",
			longitude: "126.698399"
		};
 		let testModal = this.modalCtrl.create(outletPage, {
			title: "paju",
			latitude: "37.769191",
			longitude: "126.698399"
		});
 		testModal.present();
 	}
 	onMap2(): void {
 		let data = {
			title: "siheung",
			latitude: "37.379407",
			longitude: "126.736255"
		};
		this.navCtrl.push(outletPage, data);
 	}
 	onMap3(): void {
 		 let data = {
			title: "yeoju",
			latitude: "37.24065",
			longitude: "127.611415"
		};
		this.navCtrl.push(outletPage, data);
 	}
 	onMap4(): void {
 		 let data = {
			title: "Chicago Premium Outlet",
			latitude: "41.800478",
			longitude: "-88.273974"
		};
		this.navCtrl.push(outletPage, data);
 	}
 	closeModal(): void{
 		this.viewCtrl.dismiss();
	}
 
}