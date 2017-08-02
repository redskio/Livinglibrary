import { Component, Input } from '@angular/core';

import { AlertController, App, MenuController } from 'ionic-angular';

import { AuthService } from "../../providers/auth.service";
import { BaseComponent } from "../base.component";
import { User } from './../../models/user.model';
import {Storage} from '@ionic/storage';
import {UserService} from "../../providers/user.service";
@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;
  @Input() user: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController,
    public storage: Storage,
    public userService: UserService
  ) {
    super(alertCtrl, authService, app, menuCtrl, storage, userService);
  }

}
