import Joi from "joi";

const createTestInputValidation = Joi.object({
    name: Joi.string().required(),
    date: Joi.string().required()
})

const updateTestInputValidation = Joi.object({
    name: Joi.string().optional(),
    date: Joi.string().optional()
})

export { createTestInputValidation, updateTestInputValidation }