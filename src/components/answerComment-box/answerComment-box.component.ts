import { Component, Input } from '@angular/core';
import { Comment } from './../../models/comment.model';

@Component({
  selector: 'answerComment-box',
  templateUrl: 'answerComment-box.component.html',

})
export class answerCommentBox {

  @Input() answerComment: Comment;
  constructor( ) {

  }
}
