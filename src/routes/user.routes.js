import express from "express";
import { getUser, login, signup, updateUserPic } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.route("/create").post(upload.single("pic"), signup);

router.route("/login").post(upload.none(), login);

router.route("/update-pic").post(isLoggedIn, updateUserPic);

router.route("/user/info").get(upload.none(), isLoggedIn, getUser);

export default router;