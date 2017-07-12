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
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public params: NavParams,
    public af: AngularFire
  ) {}

  ionViewDidLoad() {
    if (this.params.get('_type') == 'outlet') {
      this.loadOutlet();
    } else {
      this.currentLocWithOutlet();
    }
  }

  loadOutlet() {
    let latitude = this.params.get('latitude');
    let longitude = this.params.get('longitude');
    let title = this.params.get('title');

    this.outletBrand = this.af.database.list('/' + title);
    let latLng = new google.maps.LatLng(latitude, longitude);

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
  }
  currentLocWithOutlet() {
    this.getPermissions();
    this.geolocation.getCurrentPosition().then((position) => {

      var lat: number = position.coords.latitude
      var lon: number = position.coords.longitude
      let latLng = new google.maps.LatLng(lat, lon);
      alert(lat);
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
    }, (err) => {
      alert(err);
    });
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
    });

  }

}