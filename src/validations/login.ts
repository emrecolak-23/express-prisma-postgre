import Joi from "joi";

const loginValidation = Joi.object({
    email: Joi.string().email().required()
})

export { loginValidation }