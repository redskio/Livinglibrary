import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { ItemService } from './../../providers/item.service';
import { UserService } from './../../providers/user.service';
import { Item } from './../../models/item.model';
import { User } from './../../models/user.model';
import { HomePage } from './../home/home';
import firebase from 'firebase';


/**
 * Generated class for the AddItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  itemForm: FormGroup;
  items: FirebaseListObservable<Item[]>;
  imgurl: string[];
  filePhoto: File[];
  currentTimestamp: Object;
  currentUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public itemService: ItemService,
    public loadingCtrl: LoadingController,
    public userService: UserService,

  ) {
    this.itemForm = this.formBuilder.group({
      _title: ['', [Validators.required, Validators.minLength(3)]],
      _content: ['', [Validators.required, Validators.minLength(1)]],
      _brand: ['선택안됨', Validators.required],
      _location: ['', Validators.required],
      _duration: ['시간', Validators.required],
      _time: ['', Validators.required],
      selling_price: ['', [Validators.required]],
      normal_price: ['', [Validators.required]],
      purchase_price: ['', [Validators.required]],
    });
    this.imgurl = new Array(3);
    this.filePhoto = new Array(3);
  }

  ionViewDidLoad() {
    this.items = this.itemService.items;
    this.currentTimestamp = firebase.database.ServerValue.TIMESTAMP;
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.currentUser = currentUser;
      });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }

  onPhoto(event, _index: number): void {
    this.filePhoto[_index] = event.target.files[0];
    if (this.filePhoto[_index]) {

      let uploadTask = this.itemService.uploadPhoto(this.filePhoto[_index], this.currentUser.name + '_' + 'currentTimestamp' + '_' + _index);
      let loading: Loading = this.showLoading();

      uploadTask.on('state_changed', (snapshot) => {

      }, (error: Error) => {
        // catch error
      }, () => {
        loading.dismiss();
        this.imgurl[_index] = uploadTask.snapshot.downloadURL;
      });

    }
  }

  onSubmit(): void {
    let formItem = this.itemForm.value;
    let title: string = formItem._title;
    let content: string = formItem._content;
    let location: string = formItem._location;
    let selling_price: number = formItem.selling_price;
    let purchase_price: number = formItem.purchase_price;
    let normal_price: number = formItem.normal_price;
    
    let date: number = new Date().getTime();
    let obduedate = new Date();
    
    switch (formItem._duration) {
      case 'min':
        obduedate.setMinutes(obduedate.getMinutes()+formItem._time);
        break;
      case 'hour':
        obduedate.setHours(obduedate.getHours()+formItem._time);
        break;
      case 'day':
        obduedate.setDate(obduedate.getDate()+formItem._time);
        break;
    }
    let duedate: number = obduedate.getTime();
      this.itemService.addItem(title,content,location,date,duedate,selling_price,normal_price,purchase_price,this.imgurl[0],this.imgurl[1],this.imgurl[2]);
      this.navCtrl.push(HomePage);

  }
}
