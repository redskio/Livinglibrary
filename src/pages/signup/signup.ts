import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, Loading, LoadingController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import 'rxjs/add/operator/first';
import { Camera } from '@ionic-native/camera';
import { ImageResizerOptions, ImageResizer } from 'ionic-native';
import { FirebaseAuthState } from 'angularfire2';
import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { UserService } from './../../providers/user.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm: FormGroup;
  imgurl: string;
  filePhoto: string;
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,

    public userService: UserService
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photo: ['']
    });

  }
  uploadImg(): void{
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
              this.filePhoto =imageData;
              this.uploadPhoto();
                this.resize(this.filePhoto);
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
              this.filePhoto =imageData;
              this.uploadPhoto();
                this.resize(this.filePhoto);
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
 uploadPhoto(){
    let uploadTask = this.userService.uploadPhoto_url(this.filePhoto, '_' + new Date().getTime() + '_' );
      let loading: Loading = this.showLoading();

      uploadTask.on('state_changed', (snapshot) => {

      }, (error: Error) => {
        // catch error
        alert(error);
      }, () => {
        loading.dismiss();
        this.imgurl = uploadTask.snapshot.downloadURL;
      });
  }
  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;
    formUser.photo = this.imgurl;
    this.userService.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {

        if (!userExists) {

          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {

            delete formUser.password;
            let uuid: string = authState.auth.uid;

            this.userService.create(formUser, uuid)
              .then(() => {
                console.log('Usuario cadastrado!');
                this.navCtrl.setRoot(HomePage);
                loading.dismiss();
              }).catch((error: any) => {
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              });

          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });

        } else {

          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loading.dismiss();

        }

      });

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
