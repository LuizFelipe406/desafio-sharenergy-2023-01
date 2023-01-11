import bcrypt = require("bcryptjs");
import JWT from "../auth/JWT";
import UserODM from "../database/models/UserODM";
import CustomError from "../utils/CustomError";

export default class LoginService {
  private userODM: UserODM;

  constructor() {
    this.userODM = new UserODM();
  }

  async execute(username: string, password: string) {
    if (!username || !password) throw new CustomError("fields missing", 400);

    const user = await this.userODM.findByUsername(username);
    if (!user) throw new CustomError("invalid credentials", 401);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) throw new CustomError("invalid credentials", 401);

    return JWT.generateToken(user);
  }
}