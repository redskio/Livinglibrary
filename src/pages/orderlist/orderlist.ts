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
  buyitems: FirebaseListObservable<Item[]>;
  sellList: FirebaseListObservable<any[]>;
  sellitems: Array<Item>;
  items_length: number;
  orderlist: string = "selllist";

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
    this.sellitems = new Array<Item>();
   // this.sellitems.push(new Item('aa','aa','aa','aa','aa',2222,3333,3333,1111,4444,'','','','',3333,2222));

  }
  
  ionViewDidLoad() {
     this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.currentUser = currentUser;
			});
      this.buyitems = this.af.database.list('/users/'+this.currentUser.$key+'/buyItems');
      this.sellList = this.af.database.list('/users/'+this.currentUser.$key+'/sellItems');
      this.sellList.subscribe(list=>{list.forEach(num=>{
       this.af.database.object('/items/'+num.itemId).subscribe(item=>{
        this.sellitems.push(item);
        });

      });
      });
      
  }
  onSellItemClick(item:Item){
    //item.
  }
}
