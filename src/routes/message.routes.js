import express from "express";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import { create } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/create").post(isLoggedIn, create);


export default router;