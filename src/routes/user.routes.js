import express from "express";
import { login, signup, updateUserPic } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/create").post(signup);

router.route("/login").post(login);

router.route("/update-pic").post(isLoggedIn, updateUserPic);

export default router;