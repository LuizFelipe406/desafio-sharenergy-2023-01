import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().min(8).required(),
  address: Joi.string().required(),
  cpf: Joi.string().min(11).required(),
});

export default schema