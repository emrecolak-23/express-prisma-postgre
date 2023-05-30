import Joi from "joi"

const inputCourseValidation = Joi.object({
    name: Joi.string().required(),
    courseDetails: Joi.string().required()
})




export { inputCourseValidation }