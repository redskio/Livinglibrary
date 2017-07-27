import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {UserService} from '../../providers/user.service';
import {User} from '../../models/user.model';
import {Item} from '../../models/item.model';
import {Comment} from '../../models/comment.model';
import {CommentService} from '../../providers/comment.service';
import firebase from 'firebase';

/**
 * Generated class for the QnaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-qna',
  templateUrl: 'qna.html',
})
export class QnaPage {
  comments : FirebaseListObservable<Comment[]>;
  currentUser: User;
  currentItem: Item;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public userService: UserService,
    public commentService: CommentService
) {
      this.currentItem = this.navParams.get('itemInfo');
  }

  ionViewDidLoad() {
    this.setComment();
  }
 setComment(){
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.currentUser = currentUser;

        let doSubscription = () => {
          this.comments
            .subscribe((comments: Comment[]) => {

            });
        };

        this.comments = this.commentService
          .getComments(this.currentItem.$key);

        this.comments
          .first()
          .subscribe((comments: Comment[]) => {
            doSubscription();
          })
      })
  }

  sendComment(newComment: string): void {
    if (newComment) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      this.commentService.create(
        new Comment(
          newComment,
          currentTimestamp,
          this.currentUser.name
        ),
        this.comments
      ).then(() => {
      });
    }
  }
}
