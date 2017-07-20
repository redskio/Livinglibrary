import { OnInit } from "@angular/core";

import { App, AlertController, MenuController, NavController } from 'ionic-angular';
import {UserService} from './../providers/user.service';
import { AuthService } from './../providers/auth.service';
import { SigninPage } from './signin/signin';
import {Storage} from '@ionic/storage';
import {User} from "../models/user.model";
import firebase from 'firebase';
export abstract class BaseComponent implements OnInit {

    protected navCtrl: NavController;
    public currentUser: User;
    constructor(
        public alertCtrl: AlertController,
        public authService: AuthService,
        public app: App,
        public menuCtrl: MenuController,
        public storage: Storage,
        public userService: UserService
    ) {}

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout(): void {
        this.alertCtrl.create({
            message: 'Do you want to quit?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {




                        this.authService.logout()
                            .then(() => {
                                this.storage.set('email',null);
                                this.storage.set('pwd', null);
                                this.storage.set('logType', null);
                                this.userService.currentUser
                                .first()
                                .subscribe((currentUser: User) => {
                                  this.currentUser = currentUser;
                                  firebase.database().ref('pushtokens/'+this.currentUser.$key).remove();
                                })
                                this.navCtrl.setRoot(SigninPage);
                                this.menuCtrl.enable(false, 'user-menu');
                            });
                    }
                },
                {
                    text: 'No'
                }
            ]
        }).present();
    }

}
