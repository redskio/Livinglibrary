import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from'rxjs'
import { FirebaseListObservable } from 'angularfire2';
import { Item } from './../../models/item.model';
import { ItemService } from './../../providers/item.service';
import { OutletService } from './../../providers/outlet.service';
/*
  Generated class for the SearchDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchDataProvider {
  items: FirebaseListObservable<Item[]>;
  constructor(public http: Http, public itemService: ItemService, public outletService: OutletService) {
    this.items = this.itemService.items;
  }

  searchItems(searchTerm: string){
   
   return this.items.map(items=>{
      var filtered = items.filter(item=>{
        return item.title.toLowerCase().indexOf(searchTerm.toLowerCase())>-1|| item.brand.toLowerCase().indexOf(searchTerm.toLowerCase())>-1;
      });
        return filtered;
    });
  
  }
}
