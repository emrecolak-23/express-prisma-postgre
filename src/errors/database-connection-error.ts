import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Something went wrong for connection to database'
    statusCode = 500

    constructor() {
        super('Something went wrong for connection to database')

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.reason }]
    }

}