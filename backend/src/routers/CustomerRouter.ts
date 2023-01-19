import express from "express";
import CustomerController from "../controllers/CustomerController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

export default class CustomerRouter {
  public router: express.IRouter;
  private customerController: CustomerController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = express.Router();
    this.customerController = new CustomerController();
    this.authMiddleware = new AuthMiddleware();

    this.configRoutes();
  }

  private configRoutes() {
    this.router.get("/",
    this.authMiddleware.validateToken,
    (req, res, next) => this.customerController.findAll(req, res, next)
    );

    this.router.post("/",
    this.authMiddleware.validateToken,
    (req, res, next) => this.customerController.create(req, res, next)
    );

    this.router.patch("/:id",
    this.authMiddleware.validateToken,
    (req, res, next) => this.customerController.update(req, res, next)
    );

    this.router.delete("/:id",
    this.authMiddleware.validateToken,
    (req, res, next) => this.customerController.delete(req, res, next)
    );
  }
}