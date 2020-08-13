import {User} from '@shared/models/user.model';

export class Comment {
  constructor() {

  }

  public id: number;
  public text: string;
  public createdTime: Date;
  public user: User;
}
