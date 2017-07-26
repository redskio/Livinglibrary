import {Component, ViewChild} from '@angular/core';
import {
  Content, NavController, NavParams, MenuController, AlertController, App, ActionSheetController,
  Loading, LoadingController
} from 'ionic-angular';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Camera } from '@ionic-native/camera';
import { ImageResizerOptions, ImageResizer } from 'ionic-native';
import { AuthService } from './../../providers/auth.service';
import { Chat } from './../../models/chat.model';
import { ChatService } from './../../providers/chat.service';
import { Message } from './../../models/message.model';
import { MessageService } from './../../providers/message.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';

import firebase from 'firebase';
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage{

  @ViewChild(Content) content: Content;

  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  filePhoto: string;
  imgChat: boolean;
  imgurl: string;
  sender: User;
  recipient: User;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public alertCtrl: AlertController,
    public app: App,
    public menuCtrl: MenuController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.imgChat = false;
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        if (this.recipient.photo) {
          this.chat1
            .first()
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
            });
        }

        let doSubscription = () => {
          this.messages
            .subscribe((messages: Message[]) => {
              this.scrollToBottom();
            });
        };

        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .first()
          .subscribe((messages: Message[]) => {

            if (messages.length === 0) {

              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

              doSubscription();

            } else {
              doSubscription();
            }

          });

      });

  }

  sendMessage(newMessage: string): void {

    if (newMessage) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(
        new Message(
          this.sender.$key,
          this.recipient.$key,
          newMessage,
          currentTimestamp,
          this.imgurl
        ),
        this.messages
      ).then(() => {

        this.chat1
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });

        this.chat2
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });
        this.imgurl = null;
        this.imgChat = false;

      });

    }

  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }
  sendImage(): void{
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.camera.getPicture({
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              destinationType: this.camera.DestinationType.DATA_URL,
              allowEdit: true,
              targetWidth: 1024,
              targetHeight: 1024
            }).then((imageData) => {
              // imageData is a base64 encoded string
              this.filePhoto =imageData;
              this.uploadPhoto();
            }, (err) => {
              alert(err);
            });

          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.camera.getPicture({
              sourceType: this.camera.PictureSourceType.CAMERA,
              destinationType: this.camera.DestinationType.DATA_URL,
              allowEdit: true,
              targetWidth: 1024,
              targetHeight: 1024
            }).then((imageData) => {
              // imageData is a base64 encoded string
              this.filePhoto =imageData;
              this.uploadPhoto();
            }, (err) => {
              alert(err);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  resize(_img: string){
    let options1 = {
      uri: _img,
      quality: 90,
      width: 100,
      height: 100,
    } as ImageResizerOptions;
  }
  uploadPhoto(){
    let uploadTask = this.messageService.uploadPhoto(this.filePhoto, this.sender.name + '_' + new Date().getTime() + '_' + this.recipient.name);
    let loading: Loading = this.showLoading();

    uploadTask.on('state_changed', (snapshot) => {

    }, (error: Error) => {
      // catch error
      alert(error);
    }, () => {
      loading.dismiss();
      this.imgurl = uploadTask.snapshot.downloadURL;
      this.imgChat = true;
    });
  }
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }
}
