import {ApiError} from "./ApiError.js"
export const asyncHandler = (fn)=>async(req, res, next)=>{
    try {
        return await fn(req, res, next);
    } catch (error) {
        res.status(500).json(new ApiError(error?.statusCode, error?.message));
    }
}