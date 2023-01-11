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
  describe('Testa o método GET', function () {
    it('Faz uma requisição sem token e espera retornar erro', async function() {
      const response = await chai
      .request(app)
      .get('/customer')
      .send({});

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
})