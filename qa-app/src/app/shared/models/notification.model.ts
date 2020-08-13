import {User} from '@shared/models/user.model';

export class Notification {
  constructor() {
  }

  public id: number;
  public text: string;
  public createdTime: Date;
  public receiverId: number;
  public type: number;
  public user: User;
}
