import { Router } from "express";
import booking from "../controllers/booking.controller.js";

const router = Router()

router.route("/").get(booking);

export default router;
