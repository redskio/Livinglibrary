import {Injectable} from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import {BaseService} from "./base.service";

declare var FCMPlugin;

@Injectable()
export class pushService extends BaseService {
  firestore = firebase.database().ref('pushtokens/'+firebase.auth().currentUser.uid);

  constructor(public afd: AngularFireDatabase) {
    super();
  }

  getToken(){

    this.tokensetup().then((token) => {

      this.storetoken(token);

    })
  }

  pushCheck() {
    FCMPlugin.onNotification(function(data){
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(data) );
      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
      }
    });

    FCMPlugin.onTokenRefresh(function(token){
      alert( token );
    });
  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
        resolve(token);
      }, (err) => {
        reject(err);
      });
    })
    return promise;
  }

  storetoken(t) {

    firebase.database().ref('pushtokens/'+firebase.auth().currentUser.uid).on('child_added',function (data) {
      if(data.val().devtoken == t){
        alert("이미 이 기기로 로그인해서 토큰이있다")
      } else {
        this.afd.list(this.firestore).push({
          userId: firebase.auth().currentUser.uid,
          devtoken: t
        }).then(() => {
          alert('Token stored');
        }).catch(() => {
          alert('Token not stored');
        })
      }
    });

  }

}
