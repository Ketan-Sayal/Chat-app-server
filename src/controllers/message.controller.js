import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from "../models/room.models.js";
import { Message } from "../models/message.models.js";
import mongoose from "mongoose";

export const create = asyncHandler(async(req, res)=>{
    // find the room or check if any value is not-defined then throw error
    // return the message with user details and room details
    const {_id} = req.user;
    const {message, roomId} = req.body;
    if(!message || !roomId){
        throw new ApiError(401, "All feilds are required");
    }
    const room = await Room.findById(roomId);
    if(!room){
        throw new ApiError(402, "Invalid room");
    }
    const newMessage = await Message.create({
        message,
        user:_id,
        room:room._id
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
                from:'rooms',
                localField:'room',
                foreignField:'_id',
                as:'room_details'
            }
        },
        {
            $addFields:{
                user:{
                    $first:'user_details'
                },
                room:{
                    $first:'room_details'
                }
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, {message:messageToSent[0]}, "Message with details sent successfully")
    );
})