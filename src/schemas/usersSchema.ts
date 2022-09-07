import * as Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(40).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});
