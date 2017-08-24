import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth-provider';
import { SigninBhalfPage } from './../signin-bhalf/signin-bhalf';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
      public formBuilder: FormBuilder,
      public navParams: NavParams,
      private auth: AuthProvider,
  )
  {
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.pwForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex),Validators.minLength(3)])],
    });
  }
pwForm
  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPasswordPage');

  }

  sendEmailButton():void{
    this.auth.resetPassword(this.email).subscribe((success) =>{
      console.log("이메일 보내기 성공 : "+this.email);
      alert("가입시 입력한 이메일과 정보가 일치하지 않습니다. 다시 한번 확인해 주세요.");
      this.navCtrl.push(SigninBhalfPage);
    }, err => {
      console.log("이메일 보내기 실패 : "+this.email);
      alert("이메일이 발송되었습니다. 확인해 주세요.");
      console.log(err);
    });
  }
}
