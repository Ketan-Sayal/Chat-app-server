class ApiError extends Error{
    constructor(statusCode=500, message="Something went wrong", stack=null){
        super(message);

        this.statusCode = statusCode;
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