import jwt = require("jsonwebtoken");
import User from "../domains/User";

export type JwtPayload = {
  id?: string;
  username: string;
};

export default class JWT {
  private static secret = process.env.JWT_SECRET || "jwt_secret";

  static generateToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    const jwtConfig = {
      expiresIn: "1d",
    };

    const token = jwt.sign(payload, this.secret, jwtConfig);

    return token;
  }

  static validateToken(token: string): JwtPayload | null {
    try {
      const payload = jwt.verify(token, this.secret) as JwtPayload;
      return payload;
    } catch (error) {
      return null;
    }
  }
}
