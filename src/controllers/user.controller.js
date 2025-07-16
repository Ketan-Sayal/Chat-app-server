import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { upload } from "../utils/cloudinary.js";
import {User} from "../models/user.models.js";

export const signup = asyncHandler(async(req, res)=>{
    // Singup the user if username, email, passsword is there
    // for the pic check if pic is sent or not if sent then upload it to server
    // Otherwise upload it to cloudinary
    // then save the the url to the server

    const {username, email, password} = req.body;
    const pic = req.file;
    if(!email || !username || !password){
        throw new ApiError(401, "All feilds are required");
    }
    const user = await User.findOne({email:email});
    if(user){
        throw new ApiError(402, "User already exists");
    }
    let uploadUrl = "";
    let uploadPublicId = "";
    if(pic){
        const result = await upload(pic.path);
        if(result){
            uploadUrl = result.url;
            uploadPublicId = result.public_id;
        }
    }

    const newUser = await User.create({
        username:username,
        email:email,
        password:password,
        pic:uploadUrl,
        picPublicId:uploadPublicId
    });
    if(!newUser){
        throw new ApiError(500, "Something went wrong while creating the user");
    }
    const accessToken = newUser.getAccessToken();

    const userToSent = await User.findById(newUser._id).select("-password");


    return res.status(200).json(
        new ApiResponse(200, {user: userToSent, token: accessToken}, "User signed in successfully")
    );
});

export const login = asyncHandler(async(req, res)=>{
    // check if user exists if not throw error
    // return the user data
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(401, "All feilds are required");
    }
    const user = await User.findOne({email:email});
    if(!user){
        throw new ApiError(402, "User doesn't exists");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(403, "Invalid user password");
    }
    const userToSent = await User.findById(user._id).select("-password");

    const accessToken = user.getAccessToken();
    return res.status(200).json(
        new ApiResponse(200, {user:userToSent, accessToken}, "User logged in successfully")
    );
});

export const updateUserPic = asyncHandler(async(req, res)=>{
    // get the user by email
    // get the pic path
    // upload it to cloudinary if not any pic then return error
    // After uploading then uptate the user
    
    const {_id} = req.user;
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError(401, "Invalid user");
    }
    
});