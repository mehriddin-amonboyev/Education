import Joi from "joi";

export const createTestSxema = Joi.object({
  matni: Joi.string().required(),
  mavzu_nomi: Joi.string().required(),
  qiyinchilik_darajasi: Joi.string().required(),
  A: Joi.string().required(),
  B: Joi.string().required(),
  C: Joi.string().required(),
  D: Joi.string().required(),
  correct_answer: Joi.string().required(),
});