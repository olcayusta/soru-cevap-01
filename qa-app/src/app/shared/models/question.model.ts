import { User } from '@shared/models/user.model';
import { Tag } from '@shared/models/tag.model';
import { Answer } from '@shared/models/answer.model';
import { Comment } from '@shared/models/comment.model';

export class Question {
  constructor(
    public title: string,
    public text: string
  ) {
  }

  public id: number;
  public createdTime: Date;
  public authorId: number;
  public user: User;
  public tags: Tag[];
  public comments: Comment[];
  public acceptedAnswer: Answer;
  public upvoteCount: number;
  public downvoteCount: number;
  public viewCount: number;
  public answers: Answer[];
}


/*
import { Answer } from '@shared/models/answer.model';
import { Tag } from '@shared/models/tag.model';
import { User } from '@shared/models/user.model';

export interface Question {
  readonly id: number;
  title: string;
  text: string;
  createdTime: Date;
  readonly authorId: number;
  readonly user: User;
  readonly tags: Tag[];
  readonly comments: Comment[];
  acceptedAnswer: Answer;
  upvoteCount: number;
  downvoteCount: number;
  viewCount: number;
  answers: Answer[];
}
*/
