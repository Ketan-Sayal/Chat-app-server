import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    user1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:true});

export const Room = mongoose.model("Room", roomSchema);