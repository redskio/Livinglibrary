import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {AngularFire, FirebaseListObservable, FirebaseApp} from 'angularfire2';

import { BaseService } from "./base.service";
import { Message } from '../models/message.model';

@Injectable()
export class MessageService extends BaseService {

  constructor(
    public af: AngularFire,
    public http: Http,
    @Inject(FirebaseApp) public firebaseApp: any,
  ) {
    super();
  }

  create(message: Message, listMessages: FirebaseListObservable<Message[]>): firebase.Promise<void> {
    return listMessages.push(message)
      .catch(this.handlePromiseError);
  }

  getMessages(userId1: string, userId2: string): FirebaseListObservable<Message[]> {
    return <FirebaseListObservable<Message[]>>this.af.database.list(`/messages/${userId1}-${userId2}`, {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 30
      }
    }).catch(this.handleObservableError);
  }
  uploadPhoto(url: string, _filename: string): firebase.storage.UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/messages/${_filename}`)
      .putString(url, 'base64', {contentType:'image/jpeg'});
  }
}
