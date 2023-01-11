import CustomerODM from "../database/models/CustomerODM";
import ICustomer from "../interfaces/ICustomer";
import CustomError from "../utils/CustomError";

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
}