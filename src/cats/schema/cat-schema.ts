import * as Joi from 'joi';

// Use Joi Validation Pipe
export const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
