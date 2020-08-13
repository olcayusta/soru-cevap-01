import { User } from '@shared/models/user.model';
import { Comment } from '@shared/models/comment.model';
import { Question } from '@shared/models/question.model';

export class Answer {
  constructor(
    public text: string,
    public questionId: number
  ) {
  }

  public id: number;
  public createdTime: Date;
  public user: User;
  public upvoteCount: number;
  public downvoteCount: number;
  public comments: Comment[];
  public question: Question;
}
