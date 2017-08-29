import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';
import { SigninBhalfPage } from './../signin-bhalf/signin-bhalf';
import { AuthProvider } from './../../providers/auth-provider';
import { Facebook } from '@ionic-native/facebook';
import { UserService } from './../../providers/user.service';
import {Storage} from '@ionic/storage';
import {pushService} from "../../providers/push.service";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  userProfile: any = null;
  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private facebook: Facebook,
    private auth: AuthProvider,
    public userService: UserService,
    public pushService: pushService,
  ) {


  }

  onSigninBhalf(): void{
    this.navCtrl.push(SigninBhalfPage);
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

  facebookLogin(): void {
    this.auth.loginWithFacebook().subscribe((success) => {
      let loading: Loading = this.showLoading();
      console.log('여기가 페이스북 회원가입이다 '+success.email+" <-이메일자리"+success.displayName+" <-이름자리");
      this.signupForm = this.formBuilder.group({
      email: [success.email, ],
      name: [success.displayName, ],
      photo : [success.photoURL, ],
      username: [success.email, ],
      });
      let formUser = this.signupForm.value;
      let uuid: string = success.uid;
      this.storage.set('logType', 'facebook');
      this.storage.get('logType').then((val)=>{
              console.log("무슨값?"+val);
           })
      this.userService.create(formUser, uuid)
         .then(() => {
           
           this.storage.set('email',this.signupForm.value.email);
           this.storage.set('name', this.signupForm.value.name);
           this.storage.set('photo', this.signupForm.value.photo);
           this.storage.set('logType', 'facebook');
           this.pushService.setToken(uuid);
           this.storage.get('logType').then((val)=>{
              console.log("무슨값?"+val);
           })
           loading.dismiss();
           this.navCtrl.setRoot(HomePage);
         }).catch((error: any) => {
           console.log(error);
           loading.dismiss();
           this.showAlert(error);
          });
    }, err => {

      console.log(err);
    });
  }


}






