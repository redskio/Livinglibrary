import { Component, Input, TemplateRef } from '@angular/core';
import { Comment } from './../../models/comment.model';
import {FirebaseListObservable} from "angularfire2";
import {User} from "../../models/user.model";
import {Item} from "../../models/item.model";
import firebase from 'firebase';
import {CommentService} from "../../providers/comment.service";
@Component({
  selector: 'comment-box',
  templateUrl: 'comment-box.component.html',

})
export class CommentBox {
  @Input() currentUser: User;
  @Input() currentItem: Item;
  answerComments : FirebaseListObservable<Comment[]>;
  @Input() comment: Comment;

  answerPush : boolean;
  constructor(
    public commentService: CommentService,
  ) {
  }

  ngOnInit(){
    this.answerPush=false;

    this.answerComments = this.commentService
      .getAnswerComments(this.currentItem.$key, this.comment.$key);

    this.answerComments
      .first()
      .subscribe((answerComments: Comment[])=>{

      })

  }
  addAnswerInput(){

    if(this.answerPush){
      this.answerPush=false;
    } else{
      this.answerPush= true;
    }
  }
  sendAnswerComment( answerComment: string): void {

    if (answerComment) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.commentService.create(
        new Comment(
          answerComment,
          currentTimestamp,
          this.currentUser.name
        ),
        this.answerComments
      ).then(() => {
        this.answerPush = false;
        try {

        }catch (e){
          //alert(e);
        }
      });
    }
 }
}
