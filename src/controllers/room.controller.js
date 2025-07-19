import { Room } from "../models/room.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create = asyncHandler(async(req, res)=>{
    const user2Id = req.params?.userId;
    const user1 = req.user;
    const user2Details = await User.findById(user2Id);
    const user1Details = await User.findById(user1._id);
    if(!user1Details || !user2Details){
        throw new ApiError(401, "User not found");
    }
    const room = await Room.create({
        user1:user1Details?._id,
        user2:user2Details?._id
    });
    return res.status(200).json(
        new ApiResponse(200, {room:room}, "Room for both the users is created")
    );
});

export const searchRooms = asyncHandler(async(req, res)=>{
    const {_id} = req.user;
    const rooms = await Room.find({$or:[{user1:_id}, {user2:_id}]});
    return res.status(200).json(
        new ApiResponse(200, {rooms}, "User rooms sent successfully")
    );

});

export const getParticularRoom = asyncHandler(async()=>{
    const user2Id = req.params._id;
    const {_id} = req.user;
    const user2 = await User.findById(user2Id);
    if(!user){
        throw new ApiError(401, "User not found");
    }
    const room = await Room.findOne({$or:[{user1:_id, user2:user2._id}, {user1:user2._id, user2:_id}]});
    return res.status(200).json(
        new ApiResponse(200, {room}, "Particular room is sent successfully")
    );
});