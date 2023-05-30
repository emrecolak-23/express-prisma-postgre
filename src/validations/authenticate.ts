import Joi from "joi";

const authenticateValidation = Joi.object({
    email: Joi.string().email().required(),
    emailToken: Joi.string().required()
})


export { authenticateValidation }