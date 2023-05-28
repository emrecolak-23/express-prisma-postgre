// Import Packages
import Joi from 'joi'

const userInputValidation = Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastName: Joi.string().required(),
    social: Joi.object({
        instagram: Joi.string().optional(),
        facebook: Joi.string().optional(),
        twitter: Joi.string().optional(),
        github: Joi.string().optional(),
        website: Joi.string().uri().optional()
    })
})

export { userInputValidation }