import {Chat} from '../../models/chat.model';
import {Item} from '../../models/item.model';
import {Comment} from '../../models/comment.model';
import {Outlet} from '../../models/outlet.model';
import {User} from '../../models/user.model';
import {ChatService} from '../../providers/chat.service';
import {UserService} from '../../providers/user.service';
import {ItemService} from '../../providers/item.service';
import {OutletService} from '../../providers/outlet.service';
import {CommentService} from '../../providers/comment.service';
import {ChatPage} from '../chat/chat';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {IonicPage, Loading, LoadingController, NavController, NavParams, Content} from 'ionic-angular';
import firebase from 'firebase';
import { PaypalPage } from './../paypal/paypal';
declare var google;

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
  @ViewChild(Content) content: Content;
  currentItem: Item;
  currentUser: User;
  comments : FirebaseListObservable<Comment[]>;
  handleObservableError: any;
  public user: User;
  public current_location: FirebaseObjectObservable<Outlet>;
  public location_title: string;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,public itemService: ItemService,
    public chatService: ChatService,
    public outletService: OutletService,
    public loadingCtrl: LoadingController,
    public commentService: CommentService
  ) {
    this.currentItem = this.navParams.get('itemInfo');
    this.current_location = outletService.getOutlet(this.currentItem.location);
    this.userService.get(this.currentItem.userId)
      .subscribe((editor: User) => {
        this.user = editor;
      });
  }

  ionViewDidLoad() {
    this.setComment();
    this.mapLoad();
    this.itemService.updateView(this.currentItem.$key,++this.currentItem._view);
  }
  setComment(){
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.currentUser = currentUser;

        let doSubscription = () => {
          this.comments
            .subscribe((comments: Comment[]) => {

            });
        };

        this.comments = this.commentService
          .getComments(this.currentItem.$key);

        this.comments
          .first()
          .subscribe((comments: Comment[]) => {
            doSubscription();
          })
      })
  }

  sendComment(newComment: string): void {
    if (newComment) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      this.commentService.create(
        new Comment(
          newComment,
          currentTimestamp,
          this.currentUser.name
        ),
        this.comments
      ).then(() => {
      });
    }
  }

  mapLoad() {
    this.current_location.subscribe(loc => {
      let loading: Loading = this.showLoading();
      if (loc.latitude != 0) {
        loading.dismiss();

      }
      let latitude = loc.latitude;
      let longitude = loc.longitude;
      let title = loc.title;
      this.location_title = title;
      let latLng = new google.maps.LatLng(latitude, longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      this.addInfoWindow(marker, title);
    });

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }
  onProfileClick() {
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

  onPaypalClick(){
    this.navCtrl.push(PaypalPage);
  }
}
