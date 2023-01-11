import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IUser from '../../interfaces/IUser';

class UserODM {
  private schema: Schema;
  private model: Model<IUser>;

  constructor() {
    this.schema = new Schema<IUser>({
      username: { type: String, required: true },
      password: { type: String, required: true },
    });
    this.model = models.User || model('User', this.schema);
  }

  public async findByUsername(value: string): Promise<IUser | null> {
    return this.model.findOne({ username: value });
  }

  public async create(value: IUser): Promise<void> {
    this.model.create({ ...value });
  }
}

export default UserODM;