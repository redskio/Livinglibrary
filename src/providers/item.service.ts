import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BaseService } from "./base.service";
import { Item } from './../models/item.model';

@Injectable()
export class ItemService extends BaseService {

  items: FirebaseListObservable<Item[]>;

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    super();
    this.setItems();
  }

  private setItems(): void {
    this.items = this.af.database.list('/items');
  }
  addItem(_title:string, _price:number){
  	this.items.push({
  		title: _title,
  		price: _price	
  	});
  }
  removeItem(itemId: string){
  		this.items.remove(itemId);
  }
  
  updateItem(itemId: string, _title:string, _price:number){
  	this.items.update(itemId, {
  		title: _title,
  		price: _price
  	});
  }
  

}
