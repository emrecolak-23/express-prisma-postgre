// Import Packages
import Joi from 'joi'

const userUpdateValidation = Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastName: Joi.string().required(),
    social: Joi.object().required()
})

export { userUpdateValidation }