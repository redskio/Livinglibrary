import { Component, Input } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { BaseComponent } from "../base.component";
import { User } from './../../models/user.model';
import { UserProfilePage } from './../../pages/user-profile/user-profile';
import { homeUserPage } from './../../pages/home_user/home_user';
import { homeChatPage } from './../../pages/home_chat/home_chat';
import { outletListPage } from './../../pages/outlet_list/outlet_list';
import { OrderlistPage } from './../../pages/orderlist/orderlist';

import {Storage} from '@ionic/storage';
import {UserService} from "../../providers/user.service";
@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController,
    public storage: Storage,
    public userService: UserService
  ) {
    super(alertCtrl, authService, app, menuCtrl, storage, userService);
  }

  onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }

  onChat(): void{
  	this.navCtrl.push(homeChatPage);
  }

  onUser(): void{
  	this.navCtrl.push(homeUserPage);
  }

  onOutLet(): void{
  	this.navCtrl.push(outletListPage);
  }
  onOrderlist(): void{
  	this.navCtrl.push(OrderlistPage);
  }
}
