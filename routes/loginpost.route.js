import { Router } from "express";
import loginpost from "../controllers/loginpost.controller.js"

const router = Router()

router.route("/").post(loginpost);

export default router;


