import Joi from "joi";


const createEnrollmentInputValidation = Joi.object({
    courseId: Joi.number().required(),
    role: Joi.string().required
})


export { createEnrollmentInputValidation }