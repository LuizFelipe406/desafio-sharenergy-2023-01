import IUser from "../Interfaces/IUser";

export default class User {
  readonly id?: string;
  readonly username: string;
  readonly password: string;

  constructor({ id, username, password }: IUser) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}