import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import ICustomer from '../../interfaces/ICustomer';

class CustomerODM {
  private schema: Schema;
  private model: Model<ICustomer>;

  constructor() {
    this.schema = new Schema<ICustomer>({
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      cpf: { type: String, required: true },
    });
    this.model = models.Customer || model('Customer', this.schema);
  }

  public async findAll(): Promise<ICustomer[] | null> {
    return this.model.find();
  }

  public async create(value: ICustomer): Promise<ICustomer> {
    return this.model.create({ value });
  }
}

export default CustomerODM;