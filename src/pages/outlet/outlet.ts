import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { OutletBrand } from './../../models/outletBrand.model';
declare var google;
 
@Component({
  selector: 'outlet-page',
  templateUrl: 'outlet.html'
})
export class outletPage {
 
  outletBrand: FirebaseListObservable<OutletBrand[]>;
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(
  	public navCtrl: NavController, 
  	public geolocation: Geolocation, 
  	public params: NavParams,
  	public af: AngularFire 
  	) {}
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 	let latitude = this.params.get('latitude');
 	let longitude = this.params.get('longitude');
 	let title = this.params.get('title');
 	
   	console.log("test");
    this.outletBrand = this.af.database.list('/'+title);
    console.log(this.outletBrand);
  
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(latitude,longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: latLng
	  });
 		
 	 this.addInfoWindow(marker, title);

 
    }, (err) => {
      console.log(err);
    });
 
  }
  
	  addMarker(){
	 
	  let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: this.map.getCenter()
	  });
	 
	  let content = "<h4>Information!</h4>";          
	 
	  this.addInfoWindow(marker, content);
	 
	}
	
	addInfoWindow(marker, content){
 
	  let infoWindow = new google.maps.InfoWindow({
	    content: content
	  });
	 
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.map, marker);
	  });
 
	}
 
}