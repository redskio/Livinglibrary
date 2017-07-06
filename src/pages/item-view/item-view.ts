import { Chat } from '../../models/chat.model';
import { Item } from '../../models/item.model';
import { User } from '../../models/user.model';
import { ChatService } from '../../providers/chat.service';
import { UserService } from '../../providers/user.service';
import { ChatPage } from '../chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item-view',
  templateUrl: 'item-view.html',
})
export class ItemViewPage {
  public currentItem: Item;
  public user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public chatService: ChatService) {
    this.currentItem = this.navParams.get('itemInfo');
    userService.get(this.currentItem.userId).first()
      .subscribe((editor: User) => {
        this.user = editor;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemViewPage');
  }
  onProfileClick(){
  this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {

        this.chatService.getDeepChat(currentUser.$key, this.user.$key)
          .first()
          .subscribe((chat: Chat) => {

            if (chat.hasOwnProperty('$value')) {

              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, this.user.name, (this.user.photo || ''));
              this.chatService.create(chat1, currentUser.$key, this.user.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, (currentUser.photo || ''));
              this.chatService.create(chat2, this.user.$key, currentUser.$key);

            }

          });

      });

    this.navCtrl.push(ChatPage, {
      recipientUser: this.user
    });
  }
}
