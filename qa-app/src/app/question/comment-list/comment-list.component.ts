import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Comment } from '@shared/models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {
  @Input() comments: Comment[];

  constructor() {
  }

  ngOnInit() {
  }

}
