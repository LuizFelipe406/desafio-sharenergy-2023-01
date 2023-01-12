import Joi from "joi";

const customerCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().min(8).required(),
  address: Joi.string().required(),
  cpf: Joi.string().min(11).required(),
});

const customerUpdateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().min(8),
  address: Joi.string(),
  cpf: Joi.string().min(11),
});

export { customerCreateSchema, customerUpdateSchema };