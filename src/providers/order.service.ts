import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';

import { BaseService } from "./base.service";
import { Order } from './../models/order.model';

@Injectable()
export class OrderService extends BaseService {

  order: FirebaseListObservable<Order[]>;

  constructor(
    public af: AngularFire,
    @Inject(FirebaseApp) public firebaseApp: any,
    public http: Http
  ) {
    super();
    this.setOrder();
  }

  private setOrder(): void {
    this.order = this.af.database.list('/order');
  }

  create(ordernum: Order, _index: string): firebase.Promise<void> {
    return this.af.database.object(`/order/${_index}`)
      .set(ordernum)
      .catch(this.handlePromiseError);
  }
  addOrder(
    itemId: string,
    userId: string,
    sellerId: string,
    orderState: string,
    timestamp: number
    ) {
    this.order.push({
        itemId:itemId,
        userId:userId,
        sellerId:sellerId,
        orderState:orderState,
        timestamp:timestamp
    });
  }
  removeOrder(ordernum: string) {
    this.order.remove(ordernum);
  }



}
