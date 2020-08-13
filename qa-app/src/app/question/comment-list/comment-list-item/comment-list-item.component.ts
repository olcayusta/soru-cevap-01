import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Comment } from '@shared/models/comment.model';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListItemComponent implements OnInit {
  @Input() comment: Comment;

  constructor() {
  }

  ngOnInit() {
  }

}
