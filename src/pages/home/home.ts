import { Component } from '@angular/core';
import { AlertController,App,MenuController, NavController, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { pushService } from './../../providers/push.service';
import { AuthService } from './../../providers/auth.service';
import { AddItemPage } from './../add-item/add-item';
import { ChatService } from './../../providers/chat.service';
import { UserService } from './../../providers/user.service';
import { ItemService } from './../../providers/item.service';
import { OutletService } from './../../providers/outlet.service';
import { Item } from './../../models/item.model';
import { BaseComponent } from "../base.component";
import { outletListPage } from './../outlet_list/outlet_list';
import { ItemViewPage } from './../item-view/item-view';
import { Storage } from '@ionic/storage';
import { ChatPage } from "../chat/chat";
import { User } from "../../models/user.model";
import { SearchDataProvider } from '../../providers/search-data/search-data';
import { FilterModalPage } from '../filter-modal/filter-modal';
import { Badge } from '@ionic-native/badge';
declare var FCMPlugin : any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseComponent {

  items: any;
  items_length: number;
  view: string = 'chats';
  column: string;
  searchTerm: string = '';
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public chatService: ChatService,
    public itemService: ItemService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService,
    public pushService: pushService,
    public outletService: OutletService,
    public app: App,
    public storage: Storage,
    public searchProvider: SearchDataProvider,
    public modalCtrl: ModalController,
    public badge: Badge
  ) {
  super(alertCtrl, authService, app, menuCtrl, storage, userService);
    // this.requestPermission();
    try{
      FCMPlugin.onNotification(function(data){
        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          let recipientUserId: string = data.senderKey;
          userService.get(recipientUserId)
            .first()
            .subscribe((user: User) => {
              navCtrl.push(ChatPage, {
                recipientUser: user
              });

            });
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.

        }
      });
    } catch(e){
       console.log(e);
    }
  }
async requestPermission() {
  try {
    let hasPermission = await this.badge.hasPermission();
    console.log(hasPermission);
    if (!hasPermission) {
      let permission = await this.badge.registerPermission();
      console.log(permission);
    }
  } catch (e) {
    console.error(e);
  }
}
async getBadges() {
  try {
    let badgeAmount = await this.badge.get();
    console.log(badgeAmount);
  }
  catch (e) {
    console.error(e);
  }
}
async setBadges(badgeNumber: number) {
  try {
    let badges = await this.badge.set(badgeNumber);
    console.log(badges);
  } catch (e) {
    console.error(e);
  }
}




  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.items = this.itemService.items;
    this.items.subscribe(item_array =>{this.items_length= item_array.length;});
    this.menuCtrl.enable(true, 'user-menu');
    this.setFilteredItems();
    this.sort(1,'title');
  }
  getlocationTitle(value: string): string{
    return this.outletService.getOutletTitle(value);
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
/*
  pushCheck() {

    FCMPlugin.onTokenRefresh(function(token){
      alert( token );
    });
  }
  */
  filterBtn(){
    let filterModal = this.modalCtrl.create(FilterModalPage);
    filterModal.present();
    filterModal.onDidDismiss(data=>{
      this.sort(data.direction,data.category);
    });
  }
  setFilteredItems() {
      this.items = this.searchProvider.searchItems(this.searchTerm);
  }
  onSearch() {
      document.getElementById('searchbar').style.display='block';
  }
  sort(updown,property){
    let direction = updown;
    this.items =this.items.map((data) => {
      data.sort(function(a, b){
        if(a[property] < b[property]){
            return -1 * direction;
        }
        else if( a[property] > b[property]){
            return 1 * direction;
        }
        else{
            return 0;
        }
      });
      return data;
    });
  };

}
