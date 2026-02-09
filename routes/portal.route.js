import { Router } from "express";
import portal from "../controllers/portal.controller.js";
import { SnookerTable } from "../models/snooker.model.js";

const router = Router()

router.route("/").get(portal);

export default router;

// import { Router } from "express";
// const portalrouter = Router()

// portalrouter.get("/portal", (req,res) => {
//     res.render(`portal`)
// })

// export default portalrouter

