import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import {BaseService} from "./base.service";

declare var FCMPlugin;

@Injectable()
export class pushService extends BaseService {

  constructor(
    public afd: AngularFireDatabase) {
    super();
  }

  setToken(uuid){

    this.tokensetup().then((token) => {

      this.storetoken(token, uuid);

    })
  }
/*
  pushCheck() {
    FCMPlugin.onNotification(function(data){
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(data.message) );

      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
      }
    });

    FCMPlugin.onTokenRefresh(function(token){
      alert( token );
    });
  }
*/
  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      if (typeof FCMPlugin != 'undefined') {
      FCMPlugin.getToken(function(token){
        resolve(token);
      }, (err) => {
        reject(err);
      });
    }})
    return promise;
  }

  storetoken(t, currentUser) {
    let firestore = firebase.database().ref('pushtokens/'+currentUser);
    firebase.database().ref('pushtokens/').once('value').then((data) => {
      if(data.hasChild(currentUser)){
        firestore.remove();
        this.afd.list(firestore).push({
          userId: currentUser,
          devtoken: t
        }).then(() => {
       //   alert('Token stored1');
        }).catch(() => {
        //  alert('Token not stored');
        })
      } else{
        this.afd.list(firestore).push({
          userId: currentUser,
          devtoken: t
        }).then(() => {
       //   alert('Token stored2');
        }).catch(() => {
       //   alert('Token not stored');
        })
      }
    });
  }

}
