import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';
import { AuthProvider } from './../../providers/auth-provider';
import { Facebook } from '@ionic-native/facebook';
import { UserService } from './../../providers/user.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  userProfile: any = null;
  signinForm: FormGroup;
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
    public userService: UserService
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)

      .then((isLogged: boolean) => {

        if (isLogged) {
          this.storage.set('email',this.signinForm.value.email);
          this.storage.set('pwd', this.signinForm.value.password);
          this.storage.set('logType', 'email');
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }

      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });

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
           this.storage.set('email',this.signinForm.value.email);
           this.storage.set('name', this.signinForm.value.name);
           this.storage.set('photo', this.signinForm.value.photo);
           this.storage.set('logType', 'facebook');
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






