import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IUser from '../../interfaces/IUser';

class UserODM {
  private schema: Schema; // Atributo para o "molde"
  private model: Model<IUser>; // Atributo para criar coleção e fornecer acesso ao banco

  constructor() {
    this.schema = new Schema<IUser>({
      id: { type: String, required: false },
      username: { type: String, required: true },
      password: { type: Number, required: true },
    });
    this.model = models.User || model('User', this.schema); // Antes de criar o Schema, verificar se o schema já existe. Caso não exista, o schema será criado. 
  }

  public async findByValue(value: string): Promise<IUser> {
    return this.model.find({ value });
  }
}

export default UserODM;