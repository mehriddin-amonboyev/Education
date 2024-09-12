import Joi from "joi";

export const UpdateRoleSchema = Joi.object({
    role: Joi.string(),
});
