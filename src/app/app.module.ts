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
import { loadPage } from './../pages/loading/loading';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { answerCommentBox } from './../components/answerComment-box/answerComment-box.component';
import { CommentBox } from './../components/comment-box/comment-box.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserService } from './../providers/user.service';
import { OrderService } from './../providers/order.service';
import { OutletService } from './../providers/outlet.service';
import { homeUserPage } from '../pages/home_user/home_user';
import { homeChatPage } from '../pages/home_chat/home_chat';
import { outletPage } from '../pages/outlet/outlet';
import { outletListPage } from '../pages/outlet_list/outlet_list';
import { OrderlistPage } from '../pages/orderlist/orderlist';
import { AuthPage } from '../pages/auth/auth';
import { QnaPage } from '../pages/qna/qna';
import { ItemImg } from './../components/item-img/item-img.component';
import { AddItemPage } from '../pages/add-item/add-item';
import { ItemViewPage } from '../pages/item-view/item-view';
import { SigninBhalfPage } from '../pages/signin-bhalf/signin-bhalf';
import { AccessTermsPage } from '../pages/access-terms/access-terms';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { FilterModalPage } from '../pages/filter-modal/filter-modal';
import { UploadlistPage } from '../pages/uploadlist/uploadlist';
import { StatisticspagePage } from '../pages/statisticspage/statisticspage';
import { HelppagePage } from '../pages/helppage/helppage';
import { SupportPage } from '../pages/support/support';
import { Badge } from '@ionic-native/badge';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import {IonicStorageModule } from '@ionic/storage';
import { PaypalPage} from '../pages/paypal/paypal';
import { FindPasswordPage} from '../pages/find-password/find-password'
import {CommentService} from "../providers/comment.service";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SearchDataProvider } from '../providers/search-data/search-data';
import { TimerComponent } from '../components/timer/timer';
import { OrderByPipe } from '../pipes/order-by/order-by';
import { PickOutletPage } from '../pages/pick-outlet/pick-outlet';

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
    SigninBhalfPage,
    QnaPage,
    OrderlistPage,
    FilterModalPage,
    ItemImg,
    loadPage,
    PaypalPage,
    FindPasswordPage,
    AccessTermsPage,
    PrivacyPolicyPage,
    answerCommentBox,
    CommentBox,
    TimerComponent,
    OrderByPipe,
    PickOutletPage,
    UploadlistPage,
    StatisticspagePage,
    HelppagePage,
    SupportPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon: "ios-arrow-back",
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }
    ),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule
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
    SigninBhalfPage,
    UserProfilePage,
    OrderlistPage,
    homeUserPage,
    homeChatPage,
    AuthPage,
    outletPage,
    outletListPage,
    FilterModalPage,
    QnaPage,
    loadPage,
    PaypalPage,
    FindPasswordPage,
    AccessTermsPage,
    PrivacyPolicyPage,
    PickOutletPage,
    UploadlistPage,
    StatisticspagePage,
    HelppagePage,
    SupportPage
  ],
  providers: [
    AuthService,
    ChatService,
    ItemService,
    OrderService,
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
    pushService,
    IonicStorageModule,
    CommentService,
    SearchDataProvider,
    Badge
  ]
})
export class AppModule {}
