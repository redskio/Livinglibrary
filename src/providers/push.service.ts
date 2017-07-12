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
        alert("1");
        console.log(data);
        console.log("1111111111111111111")
        console.log(data.wasTapped);
        alert( JSON.stringify(data) );

      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
        console.log(data);
        console.log("222222222222222")
        console.log(data.wasTapped);
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
    var check = 0;
    firebase.database().ref('pushtokens/').once('value').then((val) => {
      if(val.hasChild(firebase.auth().currentUser.uid)){
        if(val.ref(firebase.auth().currentUser.uid).hasChild(t)){
          alert("1");
        } else{
          this.afd.list(this.firestore).push({
            userId: firebase.auth().currentUser.uid,
            devtoken: t
          }).then(() => {
            alert('Token stored');
          }).catch(() => {
            alert('Token not stored');
          })
        }
      } else{
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
