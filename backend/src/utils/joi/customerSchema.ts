import Joi from "joi";

const customerCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().min(15).required(),
  address: Joi.string().required(),
  cpf: Joi.string().min(14).required(),
});

const customerUpdateSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().min(3),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().min(15),
  address: Joi.string(),
  cpf: Joi.string().min(14),
  __v: Joi.number()
});

export { customerCreateSchema, customerUpdateSchema };