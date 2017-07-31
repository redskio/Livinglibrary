import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import firebase from 'firebase';
import { BaseService } from "./base.service";
import { Outlet } from './../models/outlet.model';

@Injectable()
export class OutletService extends BaseService {

  outlet: FirebaseListObservable<Outlet[]>;

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    super();
    this.setOutlet();
  }

  private setOutlet(): void {
    this.outlet = this.af.database.list('/outlet');
  }
  addOutlet(_title: string, _latitude: number, _longitude: number, _url: string) {
    this.outlet.push({
      title: _title,
      latitude: _latitude,
      longitude: _longitude,
      url: _url
    });
  }
  removeOutlet(outletId: string) {
    this.outlet.remove(outletId);
  }
  getOutlet(index: string){
    return <FirebaseObjectObservable<Outlet>>this.af.database.object('/outlet/'+index);
  }
  updateOutlet(outletId: string, _title: string, _latitude: number, _longitude: number, _url: string) {
    this.outlet.update(outletId, {
      title: _title,
      latitude: _latitude,
      longitude: _longitude,
      url: _url
    });
  }
  getOutletTitle(index: string){
    var title: string;
    this.af.database.object('/outlet/'+index).subscribe(_outlet=>{title =_outlet.title}) ;
    return title;
  }

}
