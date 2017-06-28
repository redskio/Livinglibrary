import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';

import { BaseService } from "./base.service";
import { Item } from './../models/item.model';

@Injectable()
export class ItemService extends BaseService {

  items: FirebaseListObservable<Item[]>;

  constructor(
    public af: AngularFire,
    @Inject(FirebaseApp) public firebaseApp: any,
    public http: Http
  ) {
    super();
    this.setItems();
  }

  private setItems(): void {
    this.items = this.af.database.list('/items');
  }

  create(item: Item, _index: string): firebase.Promise<void> {
    return this.af.database.object(`/items/${_index}`)
      .set(item)
      .catch(this.handlePromiseError);
  }
  addItem(title: string,
    content: string,
    location: string,
    date: number,
    duedate: number,
    selling_price: number,
    normal_price: number,
    purchase_price: number,
    imgurl1: string,
    imgurl2: string,
    imgurl3: string) {
    this.items.push({
      title: title,
      content: content,
      location: location,
      date: date,
      duedate: duedate,
      selling_price: selling_price,
      normal_price: normal_price,
      purchase_price: purchase_price,
      imgurl1: imgurl1,
      imgurl2: imgurl2,
      imgurl3: imgurl3
    });
  }
  removeItem(itemId: string) {
    this.items.remove(itemId);
  }

  updateItem(itemId: string, _title: string, _price: number) {
    this.items.update(itemId, {
      title: _title,
      price: _price
    });
  }
  uploadPhoto(file: File, _filename: string): firebase.storage.UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/items/${_filename}`)
      .put(file);
  }

}
