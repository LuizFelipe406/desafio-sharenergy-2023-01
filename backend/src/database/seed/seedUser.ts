import bcrypt = require("bcryptjs");
import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config';
import UserODM from '../models/UserODM';

const userODM = new UserODM();

export default class Seed {
  private userODM: UserODM;

  constructor() {
    this.userODM = new UserODM;
  }

  async execute(): Promise<void> {
    this.userODM.create({
      username: 'desafiosharenergy',
      password: bcrypt.hashSync('sh@r3n3rgy', 10)
    });
  }
}