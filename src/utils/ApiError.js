class ApiError extends Error{
    constructor(statusCode, message, stack){
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success = false;
        if(stack){
            this.stack = stack;
        }else{
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};