import Joi from "joi";

export const register = Joi.object({
  username: Joi.string().alphanum().min(6).max(20).required(),
  email: Joi.string().email().min(1).max(30).required(),
  password: Joi.string().alphanum().min(6).max(20).required(),
});
