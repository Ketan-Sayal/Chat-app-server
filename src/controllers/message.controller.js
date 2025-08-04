import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.models.js";
import mongoose from "mongoose";

export const create = asyncHandler(async(req, res)=>{
    // find the room or check if any value is not-defined then throw error
    // return the message with user details and room details
    const {_id} = req.user;
    const {message, user2Id} = req.body;
    if(!message){
        throw new ApiError(401, "All feilds are required");
    }
    
    const newMessage = await Message.create({
        message,
        user:_id,
        user2:user2Id
    });
    const messageToSent = await Message.aggregate([
        {
            $match:{
            _id:mongoose.Types.ObjectId.createFromHexString(newMessage?._id)
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'user',
                foreignField:'_id',
                as: 'user_details',
                pipeline:[{
                    $project:{
                        username:1,
                        email:1,
                        pic:1,
                        picPublicId:1,
                    }
                }]
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'user2',
                foreignField:'_id',
                as: 'user2_details',
                pipeline:[{
                    $project:{
                        username:1,
                        email:1,
                        pic:1,
                        picPublicId:1,
                    }
                }]
            }
        },
        {
            $addFields:{
                user:{
                    $first:'user_details'
                },
                user2:{
                    $first:'user2_details'
                }
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, {message:messageToSent[0]}, "Message with details sent successfully")
    );
})