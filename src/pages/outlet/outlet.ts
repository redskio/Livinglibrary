import {Outlet} from '../../models/outlet.model';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {OutletBrand} from './../../models/outletBrand.model';
import {OutletService} from '../../providers/outlet.service';
declare var google;
declare var cordova;
@Component({
  selector: 'outlet-page',
  templateUrl: 'outlet.html'
})
export class outletPage {

  outletBrand: FirebaseListObservable<OutletBrand[]>;
  outlets: FirebaseListObservable<Outlet[]>;
  currentOutlet: Outlet;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  url : string;
  title: string;
  addr: string;
  tel: string;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public navParams: NavParams,
    public af: AngularFire
  ) {

  }

  ionViewDidLoad() {
      this.loadOutlet();
  }

  loadOutlet() {
    this.currentOutlet = this.navParams.get('outletInfo');
    this.url = this.currentOutlet.url;
    this.title = this.currentOutlet.title;
    this.addr = this.currentOutlet.addr;
    this.tel = this.currentOutlet.tel;
    this.outletBrand = this.af.database.list('/outlet/'+ this.currentOutlet.$key+'/brandImg');
    let latLng = new google.maps.LatLng(this.currentOutlet.latitude, this.currentOutlet.longitude);

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

    this.addInfoWindow(marker, this.currentOutlet.title);
  }
   addOutletMarker(){
    this.outlets = this.af.database.list('/outlet/');
    this.outlets.forEach(outlets=>{
      let items: Outlet[] = outlets;
      items.forEach(outlet=>{
        let item: Outlet = outlet;
        alert(outlet.latitude);
      })
    })
  }
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

 
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
