import Customer from "../../../domains/Customer";

const customer1 = new Customer({
  _id: '1',
  name: 'Customer 1',
  email: 'customer1@email.com',
  phone: '1234-5678',
  address: 'Endereço 1',
  cpf: '123.456.789-10'
});

const customer2 = new Customer({
  _id: '2',
  name: 'Customer 2',
  email: 'customer2@email.com',
  phone: '1234-5678',
  address: 'Endereço 2',
  cpf: '123.456.789-11'
});

const customer3 = new Customer({
  _id: '3',
  name: 'Customer 3',
  email: 'customer3@email.com',
  phone: '1234-5678',
  address: 'Endereço 3',
  cpf: '123.456.789-12'
});

export { customer1, customer2, customer3 };