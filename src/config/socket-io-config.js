import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "../app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:[{
    origin:["http://localhost:5173", "http://localhost:5174"],
    methods:["GET", "POST"]
  }]
});

io.on("connection", (socket) => {
  socket.on("user-joined", (roomId)=>{
    socket.join(roomId);// automatically created the room
  });
  socket.on("send-message", (data)=>{
    socket.to(data.roomId).emit("message-recived", {message:data.message, name:data.name, _id:data._id});
  });

  socket.on("disconnect", ()=>{
    console.log(socket.id, " is disconnected");
    
  })

  
});

export default httpServer;