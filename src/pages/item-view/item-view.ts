import {Chat} from '../../models/chat.model';
import {Item} from '../../models/item.model';
import {Outlet} from '../../models/outlet.model';
import {User} from '../../models/user.model';
import {ChatService} from '../../providers/chat.service';
import {UserService} from '../../providers/user.service';
import {ItemService} from '../../providers/item.service';
import {OutletService} from '../../providers/outlet.service';
import {ChatPage} from '../chat/chat';
import {QnaPage} from '../qna/qna';
import {Component, ViewChild, ElementRef} from '@angular/core';
import { AngularFire, FirebaseApp, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import {IonicPage, Loading, LoadingController, NavController, NavParams, Content} from 'ionic-angular';
import firebase from 'firebase';
import { PaypalPage } from './../paypal/paypal';
import { PayPal, PayPalPayment, PayPalConfiguration } from 'ionic-native';
import { OrderService } from './../../providers/order.service';
import { HomePage } from './../home/home';
import { Order} from './../../models/order.model';
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
  handleObservableError: any;
  public user: User;
  buyList : FirebaseListObservable<User>;
  public current_location: FirebaseObjectObservable<Outlet>;
  public location_title: string;
  public sellerId:string;
  orderNum:number;
  payment:PayPalPayment;
  order_price:string;
  currencies = ['KOR', 'USD'];
  payPalEnvironment: string = 'payPalEnvironmentSandbox';
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public itemService: ItemService,
    public chatService: ChatService,
    public outletService: OutletService,
    public loadingCtrl: LoadingController,
    public orderService: OrderService,
    
  ) {
    this.currentItem = this.navParams.get('itemInfo');
    this.current_location = outletService.getOutlet(this.currentItem.location);
    this.userService.get(this.currentItem.userId)
      .subscribe((editor: User) => {
        this.user = editor;
      });
      this.order_price =Number(this.currentItem.selling_price).toString();
      this.payment = new PayPalPayment(this.order_price, 'USD', this.currentItem.title, 'sale');
  }

  ionViewDidLoad() {
    this.mapLoad();
    this.itemService.updateView(this.currentItem.$key,++this.currentItem._view);
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.currentUser = currentUser;
			});
    this.orderNum=Math.floor(Math.random() * 100000 + 10000000);
    
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
  onQnaClick(){
     this.navCtrl.push(QnaPage, {
          itemInfo: this.currentItem
    });
  }
  onPaypalClick(){
    var payPalEnvironmentSandbox = 'AbpxqNgj4BrH8zSOKWVCacFYatJuAujMh2TtwmzRD9kI5QY5Wdog2575tu58wNPwL4J0Z8lY88kVRkHZ';
	  var payPalEnvironmentProduction = 'AdM032KL1Wc4WXxzcc7eRPp1Xn8Pz-gMC3BngHejDbiisgzMy82KAFGZD9YRmzAghqP_i1noe7Z0doKA';
    PayPal.init({
			PayPalEnvironmentProduction: payPalEnvironmentProduction,
			PayPalEnvironmentSandbox: payPalEnvironmentSandbox
		}).then(() => {
			PayPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				PayPal.renderSinglePaymentUI(this.payment).then((response) => {
					this.inputOrder();
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
      console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
      this.inputOrder();// temp order, should be remove before launch
    });
  }
  inputOrder(){
    let date: number = new Date().getTime();
    alert('결제가 완료되었습니다. 판매자가 확인을 완료하면 물품이 배송될 예정입니다. 감사합니다.');
    this.orderService.addOrder(this.currentItem.$key,this.user.$key,this.currentItem.userId,'0',date);
    this.buyList = this.orderService.buyItem(this.currentUser.$key);
    this.orderService.createBuy(new Order (
      null,
      null,
      null,
      this.currentItem.$key,
      this.currentItem.title,
      this.currentItem.content,
      this.currentItem.brand,
      this.currentItem.location,
      this.currentItem.date,
      this.currentItem.duedate,
      this.currentItem.selling_price,
      this.currentItem.normal_price,
      this.currentItem.purchase_price,
      this.currentItem.imgurl1,
      this.currentItem.imgurl2,
      this.currentItem.imgurl3,
      this.currentItem._thumb,
    ),this.buyList);
    // console.log(response);
    this.navCtrl.setRoot(HomePage);
  }
}
