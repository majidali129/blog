export class appError extends Error {
    constructor(message, status, stack) {
        super();
        this.message = message;
        this.status = status
        this.data = null;
        if(stack) this.stack = stack;

        Error.captureStackTrace(this, this.constructor)
    }
}