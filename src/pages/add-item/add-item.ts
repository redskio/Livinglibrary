import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Loading, LoadingController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { ItemService } from './../../providers/item.service';
import { UserService } from './../../providers/user.service';
import { OutletService } from '../../providers/outlet.service';
import { Item } from './../../models/item.model';
import { User } from './../../models/user.model';
import { Outlet } from './../../models/outlet.model';
import { HomePage } from './../home/home';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import { ImageResizerOptions, ImageResizer } from 'ionic-native';
import { outletPage } from './../outlet/outlet';

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
  outlets: FirebaseListObservable<Outlet[]>;
  imgurl: string[];
  filePhoto: string[];
  _thumb: string;
  currentTimestamp: Object;
  currentUser: User;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public itemService: ItemService,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public userService: UserService,
    public camera: Camera,
    public outletService: OutletService,
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
    this.imgurl =  ['', '', ''];
    this.filePhoto = new Array(3);
    this.imgurl
  }

  ionViewDidLoad() {
    this.items = this.itemService.items;
    this.currentTimestamp = firebase.database.ServerValue.TIMESTAMP;
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.currentUser = currentUser;
      });
    this.outlets = this.outletService.outlet;
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }
  public presentActionSheet(index: number) {
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
              this.filePhoto[index] =imageData;
              this.uploadPhoto(index);
              if(index==0){
                this.resize(this.filePhoto[index]);
              }
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
              this.filePhoto[index] =imageData;
              this.uploadPhoto(index);
              if(index==0){
                this.resize(this.filePhoto[index]);
              }
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


//    ImageResizer
//      .resize(options1)
//      .then((filePath: any) => {
//          let uploadTask = this.itemService.uploadPhoto(filePath, 'thumb_'+this.currentUser.name + '_' + new Date().getTime());
//          let loading: Loading = this.showLoading();   
//          uploadTask.on('state_changed', (snapshot) => {
//    
//          }, (error: Error) => {
//            // catch error
//            alert(error);
//          }, () => {
//            loading.dismiss();
//            this._thumb = uploadTask.snapshot.downloadURL;
//          });
//       })
//      .catch(e => alert("Failedresizeerr"+e));

  }
  uploadPhoto(index:number){
    let uploadTask = this.itemService.uploadPhoto(this.filePhoto[index], this.currentUser.name + '_' + new Date().getTime() + '_' + index);
      let loading: Loading = this.showLoading();

      uploadTask.on('state_changed', (snapshot) => {

      }, (error: Error) => {
        // catch error
        alert(error);
      }, () => {
        loading.dismiss();
        this.imgurl[index] = uploadTask.snapshot.downloadURL;
      });
  }
  currentMap(){
    this.navCtrl.push(outletPage);
  }
  onSubmit(): void {
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
          let formItem = this.itemForm.value;
          let title: string = formItem._title;
          let content: string = formItem._content;
          let brand: string = formItem._brand;
          let location: string = formItem._location;
          let selling_price: number = formItem.selling_price;
          let purchase_price: number = formItem.purchase_price;
          let normal_price: number = formItem.normal_price;
          let date: number = new Date().getTime();
          let obduedate = new Date();
      
          switch (formItem._duration) {
            case 'min':
              obduedate.setMinutes(obduedate.getMinutes() + formItem._time);
              break;
            case 'hour':
              obduedate.setHours(obduedate.getHours() + formItem._time);
              break;
            case 'day':
              obduedate.setDate(obduedate.getDate() + formItem._time);
              break;
          }
          this._thumb= '';
          let duedate: number = obduedate.getTime();
          this.itemService.addItem(currentUser.$key, title, content, brand, location, date, duedate, selling_price, normal_price, purchase_price, this.imgurl[0], this.imgurl[1], this.imgurl[2], this._thumb);
          this.navCtrl.push(HomePage);
        });

  }
}
