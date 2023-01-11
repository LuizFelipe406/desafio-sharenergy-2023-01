import ICustomer from "../interfaces/ICustomer";

export default class Customer {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly cpf: string;

  constructor({ _id, name, email, phone, address, cpf }: ICustomer) {
    this.id = _id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.cpf = cpf;
  }
}