import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
  	console.log("test");
    this.outlet = this.af.database.list('/outlet');
    console.log(this.outlet);
  }
  addOutlet(_title:string, _latitude:number, _longitude:number){
  	this.outlet.push({
  		title: _title,
  		latitude: _latitude,
  		longitude: _longitude	
  	});
  }
  removeOutlet(outletId: string){
  		this.outlet.remove(outletId);
  }
  
  updateOutlet(outletId: string, _title:string, _latitude:number, _longitude:number){
  	this.outlet.update(outletId, {
  		title: _title,
  		latitude: _latitude,
  		longitude: _longitude
  	});
  }

  
}
