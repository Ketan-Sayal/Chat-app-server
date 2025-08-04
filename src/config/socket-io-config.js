import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "../app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials:true
  }
});

/**
 * onlineUser = {
    socketId, 
    mongodbId,
    userDetails:{
      userbname,
      email, 
      pic
    }
  }
 */

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("user-joined", (data)=>{

    const newUser = {
      socketId:socket?.id,
      mongodbId:data?._id,
      userDetails:{
        username:data?.username,
        email:data?.email,
        image: data?.pic
      }
    }
    const isUserExisting = onlineUsers.some((user)=>user?.mongodbId===data._id);
    if(!isUserExisting){
      onlineUsers.push(newUser);
    }
    io.emit("get-online-users", onlineUsers);
  });

  // send message to a particular user
  socket.on("new-message", ({user/**Sending message */, user2/**Reciving message */, message})=>{
    io.to(user2?.socketId).emit("new-message-recived", {user, message});
  });

  // User disconnected
  socket.on("disconnect", ()=>{
    onlineUsers = onlineUsers.filter((user)=>user.socketId!==socket.id);
    io.emit("get-online-users", onlineUsers);
    
  })

  
});

export default httpServer;