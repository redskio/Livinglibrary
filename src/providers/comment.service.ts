import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BaseService } from "./base.service";
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentService extends BaseService {

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    super();
  }

  create(comment: Comment, listComments: FirebaseListObservable<Comment[]>): firebase.Promise<void> {
    return listComments.push(comment)
      .catch(this.handlePromiseError);
  }

  getComments(itemKey: any): FirebaseListObservable<Comment[]> {
    return <FirebaseListObservable<Comment[]>>this.af.database.list(`/items/${itemKey}/comments/`, {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 30
      }
    }).catch(this.handleObservableError);
  }

  getAnswerComments(itemKey: any, commentKey:any): FirebaseListObservable<Comment[]> {
    return <FirebaseListObservable<Comment[]>>this.af.database.list(`/items/${itemKey}/comments/${commentKey}/answerComments`, {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 30
      }
    }).catch(this.handleObservableError);
  }
}
