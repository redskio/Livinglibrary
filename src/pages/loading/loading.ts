import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { SigninPage } from './../signin/signin';
import { AuthProvider } from './../../providers/auth-provider';
import {Storage} from '@ionic/storage';
import {UserService} from "../../providers/user.service";

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class loadPage {
  signupForm: FormGroup;
  email_set : string;
  pwd_set : string;
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private facebook: Facebook,
    public storage: Storage,
    private auth: AuthProvider,
    public userService: UserService
  ) {

    this.loginSet();
  }
  loginSet() {
    this.storage.get('logType').then((val)=>{
      //로그인 타입이 이메일 일때 자동로그인
      if(val == 'email'){
        this.storage.get('email').then((email_set)=>{

          this.storage.get('pwd').then((pwd_set)=>{

            if(email_set != null && email_set != "undefined" && pwd_set != null && pwd_set != "undefined"){
              var userLogin = {
                email: email_set,
                password: pwd_set
              }
              let loading: Loading = this.showLoading();
              this.authService.signinWithEmail(userLogin).then((isLogged: boolean) => {

                if(isLogged){
                  this.navCtrl.setRoot(HomePage);
                  loading.dismiss();
                } else{
                  this.navCtrl.setRoot(SigninPage);
                  loading.dismiss();
                }
              }).catch((error: any) => {
                console.log(error);
                this.navCtrl.setRoot(SigninPage);
                loading.dismiss();
                this.showAlert(error);
              })
            } else{
              this.navCtrl.setRoot(SigninPage);
            }
          });
        });
        //로그인 타입이 페이스북 일때 자동로그인
      } else if(val == 'facebook'){
        this.auth.loginWithFacebook().subscribe((success) => {
          let loading: Loading = this.showLoading();
          this.signupForm = this.formBuilder.group({
            email: [success.email, ],
            name: [success.displayName, ],
            photo : [success.photoURL, ],
            username: [success.email, ],
          });
          let formUser = this.signupForm.value;
          let uuid: string = success.uid;
          this.userService.create(formUser, uuid)
            .then(() => {
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
      } else{
        this.navCtrl.setRoot(SigninPage);
      }
    })

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

}






