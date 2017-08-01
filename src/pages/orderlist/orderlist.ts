import { Component } from '@angular/core';
import { AlertController,App,MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from './../../providers/item.service';
import { Item } from './../../models/item.model';
import { BaseComponent } from "../base.component";
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user.model';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage extends BaseComponent{
  items: FirebaseListObservable<Item[]>;
  items_length: number;
  
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public itemService: ItemService,
    public userService: UserService,
    public menuCtrl: MenuController,
    public app: App,
    public storage: Storage,
    public user: UserService,
    public af: AngularFire,
  ) {
    super(alertCtrl, authService,app, menuCtrl, storage, userService);
   

  }
  
  ionViewDidLoad() {
     this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.currentUser = currentUser;
			});
      this.items = this.af.database.list('/users/'+this.currentUser.$key+'/buyItems');

  }
}
