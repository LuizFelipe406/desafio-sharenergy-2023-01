import express from "express";
import LoginController from "../controllers/LoginController";

export default class UserRouter {
  public router: express.IRouter;
  private loginController: LoginController;

  constructor() {
    this.router = express.Router();
    this.loginController = new LoginController();

    this.configRoutes();
  }

  private configRoutes() {
    this.router.post("/", (req, res, next) =>
      this.loginController.execute(req, res, next)
    );
  }
}