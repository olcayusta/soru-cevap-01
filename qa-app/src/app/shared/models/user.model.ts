export class User {
  constructor(
    public email: string,
    password: string
  ) {
  }

  public id: number;
  public displayName: string;
  public avatarUrl: string;
  public signupDate: Date;
  public about: string;
}
