import express from "express";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import { create, getParticularRoom, searchRooms } from "../controllers/room.controller.js";

const router = express.Router();

router.route("/").get(isLoggedIn, searchRooms);
router.route("/create").post(isLoggedIn, create);
router.route("/room/:_id").get(isLoggedIn, getParticularRoom);

export default router;