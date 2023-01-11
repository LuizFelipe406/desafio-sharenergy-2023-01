import CustomerODM from "../database/models/CustomerODM";
import ICustomer from "../interfaces/ICustomer";
import CustomError from "../utils/CustomError";
import customerSchema from "../utils/joi/customerSchema";

export default class CustomerService {
  private customerODM: CustomerODM;

  constructor() {
    this.customerODM = new CustomerODM();
  }

  async findAll(): Promise<ICustomer[]> {
    const customers: ICustomer[] | null = await this.customerODM.findAll();
    if (!customers) throw new CustomError("No Clients Found", 404);

    return customers;
  }

  async create(body: ICustomer): Promise<ICustomer> {
    const { error } = customerSchema.validate(body);
    if (error) throw new CustomError(error.message, 400);

    const newCustomer = await this.customerODM.create(body);
    return newCustomer;
  }
}