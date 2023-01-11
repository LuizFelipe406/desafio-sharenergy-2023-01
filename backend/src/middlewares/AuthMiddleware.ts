import { NextFunction, Request, Response } from "express";
import JWT from '../auth/JWT';

export default class AuthMiddleware {
  validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const validation = JWT.validateToken(authorization as string);
    if (!validation) {
      next({ status: 401, message: 'invalid token'});
    } else {
      next();
    }
  }
}