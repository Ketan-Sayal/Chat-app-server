import express from "express";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import { create, getUsersMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/create").post(isLoggedIn, create);

router.route("/messages/:id").get(isLoggedIn, getUsersMessages);

export default router;