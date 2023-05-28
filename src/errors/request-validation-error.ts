import { CustomError } from "./custom-error";

export class RequstValidationError extends CustomError {
    statusCode = 400

    constructor(public errors: { message: string, field: string }[]) {
        super('Invalid request parameter')

        Object.setPrototypeOf(this, RequstValidationError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return this.errors.map(err => {
            return { message: err.message, field: err.field }
        })
    }
}