import { NextFunction, Request, Response } from "express";
import ICustomer from "../interfaces/ICustomer";
import CustomerService from "../services/CustomerService";

export default class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customers: ICustomer[] = await this.customerService.findAll();
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const newCustomer = await this.customerService.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
}
