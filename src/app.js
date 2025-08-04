import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

export {app};