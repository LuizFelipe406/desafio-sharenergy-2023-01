import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { app } from '../../app';
import { customer1, customer2, customer3 } from './mock/mockCustomer';

chai.use(chaiHttp);

const { expect } = chai;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImRlc2FmaW9zaGFyZW5lcmd5In0.RV0W51Ff4mk4ohYK1Ar8RfEl8VCooOfyMrEKjUKHXaQ";

describe('Testa a rota de Customer', function () {
  afterEach(sinon.restore);

  describe('Testa o método GET', function () {
    it('Faz uma requisição sem token e espera retornar erro', async function() {
      const response = await chai
      .request(app)
      .get('/customer');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'invalid token' });
    });

    it('Faz uma requisição com sucesso e espera retornar uma lista de clientes', async function() {
      sinon.stub(Model, 'find').resolves([customer1, customer2, customer3]);

      const response = await chai
      .request(app)
      .get('/customer')
      .set('authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal([customer1, customer2, customer3]);
    })
  });

  describe('Testa o método POST', function () {
    it('Faz uma requisição sem token e espera retornar um error', async function() {
      const response = await chai
      .request(app)
      .post('/customer');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'invalid token' });
    });

    it('Faz uma requisição com email em formato inválido', async function() {
      const response = await chai
      .request(app)
      .post('/customer')
      .set('authorization', token)
      .send({
        name: 'Customer 1',
        email: 'email invalido',
        phone: '1234-5678',
        address: 'Endereço 1',
        cpf: '123.456.789-10'
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'invalid email' });
    });

    it('Faz uma requisição com phone inválido', async function() {
      const response = await chai
      .request(app)
      .post('/customer')
      .set('authorization', token)
      .send({
        name: 'Customer 1',
        email: 'customer1@email.com',
        phone: '1',
        address: 'Endereço 1',
        cpf: '123.456.789-10'
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'invalid phone' });
    });

    it('Faz uma requisição com cpf inválido', async function() {
      const response = await chai
      .request(app)
      .post('/customer')
      .set('authorization', token)
      .send({
        name: 'Customer 1',
        email: 'customer1@email.com',
        phone: '1234-5678',
        address: 'Endereço 1',
        cpf: '999'
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'invalid cpf' });
    });

    it('Faz uma requisição com sucesso e espera receber um novo cliente', async function() {
      sinon.stub(Model, 'create').resolves(customer1);

      const response = await chai
      .request(app)
      .post('/customer')
      .set('authorization', token)
      .send({
        name: 'Customer 1',
        email: 'customer1@email.com',
        phone: '1234-5678',
        address: 'Endereço 1',
        cpf: '123.456.789-10'
      });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(customer1);
    });
  })
})