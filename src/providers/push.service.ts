import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import {BaseService} from "./base.service";

declare var FCMPlugin;

@Injectable()
export class pushService extends BaseService {
  firestore = firebase.database().ref('pushtokens/'+firebase.auth().currentUser.uid);

  constructor(
    public afd: AngularFireDatabase) {
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
        alert( JSON.stringify(data.message) );

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
      if (typeof FCMPlugin != 'undefined') {
      FCMPlugin.getToken(function(token){
        resolve(token);
      }, (err) => {
        reject(err);
      });
    }})
    return promise;
  }

  storetoken(t) {
    var check = 0;
    firebase.database().ref('pushtokens/').once('value').then((data) => {
      if(data.hasChild(firebase.auth().currentUser.uid)){
        firebase.database().ref('pushtokens/'+firebase.auth().currentUser.uid).once('value').then((snapshot) => {
          snapshot.forEach(function (data) {
              if(data.val().devtoken == t){
                check ++;
              }
          })
          if(check == 0){
            this.afd.list(this.firestore).push({
              userId: firebase.auth().currentUser.uid,
              devtoken: t
            }).then(() => {
              alert('Token stored1');
            }).catch(() => {
              alert('Token not stored');
            })
          }
        });
        } else{
        this.afd.list(this.firestore).push({
          userId: firebase.auth().currentUser.uid,
          devtoken: t
        }).then(() => {
          alert('Token stored2');
        }).catch(() => {
          alert('Token not stored');
        })
      }
    });

  }

}
