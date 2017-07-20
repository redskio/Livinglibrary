import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth-provider';
import { SigninBhalfPage } from './../signin-bhalf/signin-bhalf';
/**
 * Generated class for the FindPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html',
})
export class FindPasswordPage {
  email:string;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private auth: AuthProvider,
  )
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPasswordPage');

  }

  sendEmailButton():void{
    this.auth.resetPassword(this.email).subscribe((success) =>{
      console.log("이메일 보내기 성공 : "+this.email);
      this.navCtrl.push(SigninBhalfPage);
    }, err => {
      console.log("이메일 보내기 실패 : "+this.email);
      console.log(err);
    });
  }
}
