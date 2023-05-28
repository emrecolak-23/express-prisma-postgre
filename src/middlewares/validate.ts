import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
        // error => error.details = [{message:''}, {message:''}]
        const errorMessage = error.details.map(detail => {
            const regex = /"([^"]*)"/g
            const message = detail.message.replace(regex, '$1')
            const field = detail.message.match(regex)![0].replace(regex, '$1')
            return { message, field }
        })
        res.status(400).json({ errors: errorMessage })
        return
    }

    Object.assign(req, value)
    return next()

}


export default validate