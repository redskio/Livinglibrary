import {AuthService} from '../../providers/auth.service';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Loading, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import { HomePage } from './../home/home';
import { FindPasswordPage } from './../find-password/find-password';
import {User} from "../../models/user.model";
import {UserService} from "../../providers/user.service";
import {pushService} from "../../providers/push.service";

/**
 * Generated class for the SigninBhalfPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signin-bhalf',
  templateUrl: 'signin-bhalf.html',
})
export class SigninBhalfPage {
  signinForm: FormGroup;
  currentUser: User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public userService: UserService,
    public pushService: pushService
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninBhalfPage');
  }
  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)

      .then((isLogged: boolean) => {

        if (isLogged) {
          this.storage.set('email', this.signinForm.value.email);
          this.storage.set('pwd', this.signinForm.value.password);
          this.storage.set('logType', 'email');
          this.userService.currentUser
            .subscribe((user: User) => {
              this.currentUser = user;
            });

          this.pushService.setToken(this.currentUser.$key);
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }

      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
      //  alert(error);
      });

  }
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  onFindPassword(){
    this.navCtrl.push(FindPasswordPage);
  }
}
