import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule, AuthMethods, AuthProviders, FirebaseAppConfig } from 'angularfire2';

import { AuthService } from './../providers/auth.service';
import { AuthProvider} from '../providers/auth-provider' ;
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatPage } from './../pages/chat/chat';
import { ChatService } from './../providers/chat.service';
import { pushService } from './../providers/push.service';
import { ItemService } from './../providers/item.service';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageService } from './../providers/message.service';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserService } from './../providers/user.service';
import { OutletService } from './../providers/outlet.service';
import { homeUserPage } from '../pages/home_user/home_user';
import { homeChatPage } from '../pages/home_chat/home_chat';
import { outletPage } from '../pages/outlet/outlet';
import { outletListPage } from '../pages/outlet_list/outlet_list';
import { AuthPage } from '../pages/auth/auth';
import { ItemImg } from './../components/item-img/item-img.component';
import { AddItemPage } from '../pages/add-item/add-item';
import { ItemViewPage } from '../pages/item-view/item-view';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyD4GWzQWo51VR0Fk4-PFU3Va2qGGnO3rsc",
    authDomain: "whatshoeapp.firebaseapp.com",
    databaseURL: "https://whatshoeapp.firebaseio.com",
    storageBucket: "whatshoeapp.appspot.com",

};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    AddItemPage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage,
    homeChatPage,
    homeUserPage,
    ItemViewPage,
    AuthPage,
    outletPage,
    outletListPage,
    ItemImg
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    AddItemPage,
    ItemViewPage,
    SigninPage,
    SignupPage,
    UserProfilePage,
    homeUserPage,
    homeChatPage,
    AuthPage,
    outletPage,
    outletListPage
  ],
  providers: [
    AuthService,
    ChatService,
    ItemService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    Geolocation,
    OutletService,
    AuthProvider,
    Camera,
    AngularFireDatabase,
    pushService
  ]
})
export class AppModule {}
