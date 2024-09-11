import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(5).required()
});
