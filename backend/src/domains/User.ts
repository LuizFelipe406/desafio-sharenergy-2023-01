import IUser from "../interfaces/IUser";

export default class User {
  readonly id?: string;
  readonly username: string;
  readonly password: string;

  constructor({ _id, username, password }: IUser) {
    this.id = _id;
    this.username = username;
    this.password = password;
  }
}