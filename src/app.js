import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js"
import roomRouter from "./routes/room.routes.js"
import messageRouter from "./routes/message.routes.js"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/messages", messageRouter);

export {app};