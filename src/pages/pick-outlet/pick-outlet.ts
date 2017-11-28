import {Outlet} from '../../models/outlet.model';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {OutletBrand} from './../../models/outletBrand.model';
import {OutletService} from '../../providers/outlet.service';
declare var google;
declare var cordova;
@Component({
  selector: 'page-pick-outlet',
  templateUrl: 'pick-outlet.html',
})
export class PickOutletPage {

  outletBrand: FirebaseListObservable<OutletBrand[]>;
  outlets: FirebaseListObservable<Outlet[]>;
  currentOutlet: Outlet;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  url : string;
  title: string;
  addr: string;
  tel: string;
  obj: any;
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public navParams: NavParams,
    public af: AngularFire,
    public viewCtrl: ViewController
  ) {

  }

  ionViewDidLoad() {
      this.currentLocWithOutlet();
  }

  currentLocWithOutlet() {
    this.getPermissions();
    this.geolocation.getCurrentPosition().then((position) => {

      var lat: number = position.coords.latitude
      var lon: number = position.coords.longitude
      let latLng = new google.maps.LatLng(lat, lon);

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
      let title: string = 'text';
      this.addInfoWindow(marker, title);
      this.addOutletMarker();
    }, (err) => {
      alert(err);
    });
  }
  addOutletMarker(){
    this.outlets = this.af.database.list('/outlet/');
    this.outlets.forEach(outlets=>{
      let items: Outlet[] = outlets;
      items.forEach(outlet=>{
        let item: Outlet = outlet;
        // alert(outlet.latitude);
        let latLng = new google.maps.LatLng(outlet.latitude, outlet.longitude);
        this.addMarker(latLng, outlet.title);
      })
    })
  }
  addMarker(latLng, _title) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      title: _title
    });

    let content = _title;

    this.addInfoWindow(marker, content);

  }
  getPermissions() {
    var permissions = cordova.plugins.permissions;


    var list = [
      permissions.ACCESS_COARSE_LOCATION,
      permissions.ACCESS_FINE_LOCATION
    ];

    permissions.hasPermission(list, success, null);

    function error() {
      console.warn('Camera or Accounts permission is not turned on');
    }

    function success(status) {
      if (!status.hasPermission) {

        permissions.requestPermissions(
          list,
          function(status) {
            if (!status.hasPermission) error();
          },
          error);
      }
    }

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      this.obj = {title: content};
      this.dismiss();

    });

  }
  dismiss() {
    this.viewCtrl.dismiss(this.obj);
  }
}
