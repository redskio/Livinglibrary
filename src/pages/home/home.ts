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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseComponent {

  items: FirebaseListObservable<Item[]>;
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
  ) {
	super(alertCtrl, authService, app, menuCtrl);
    this.pushService.getToken();
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.items = this.itemService.items;
	this.menuCtrl.enable(true, 'user-menu');
  }

  addPage(): void{
  	this.navCtrl.push(AddItemPage);
  }

  onOutLet(): void{
  	alert("test");
  	this.navCtrl.push(outletListPage);
  }

}
