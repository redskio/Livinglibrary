import { Component } from '@angular/core';

import { AlertController,App,MenuController, NavController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import { pushService } from './../../providers/push.service';
import { AuthService } from './../../providers/auth.service';
import { AddItemPage } from './../add-item/add-item';
import { ChatService } from './../../providers/chat.service';
import { UserService } from './../../providers/user.service';
import { ItemService } from './../../providers/item.service';
import { Item } from './../../models/item.model';
import { BaseComponent } from "../base.component";
import { outletListPage } from './../outlet_list/outlet_list';
import { ItemViewPage } from './../item-view/item-view';
import {Storage} from '@ionic/storage';
declare var FCMPlugin;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseComponent {

  items: FirebaseListObservable<Item[]>;
  items_length: number;
  view: string = 'chats';
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public chatService: ChatService,
    public itemService: ItemService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService,
    public pushService: pushService,
    public app: App,
    public storage: Storage
  ) {
	super(alertCtrl, authService, app, menuCtrl, storage);
    this.pushService.getToken();
    this.pushCheck();
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
  this.items = this.itemService.items;
  this.items.subscribe(item_array =>{this.items_length= item_array.length;});
	this.menuCtrl.enable(true, 'user-menu');
  }

  addPage(): void{
  	this.navCtrl.push(AddItemPage);
  }

  onOutLet(): void{
  	this.navCtrl.push(outletListPage);
  }
  onItemClick(item : Item){
        this.navCtrl.push(ItemViewPage, {
          itemInfo: item
    });
  }

  pushCheck() {
    FCMPlugin.onNotification(function(data){
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(data.message) );

      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
        console.log(data);
        console.log("222222222222222")
        console.log(data.wasTapped);
      }
    });

    FCMPlugin.onTokenRefresh(function(token){
      alert( token );
    });
  }
}
