import { Router } from "express";
import { isAuthenticated } from "../controllers/userController.js";
import {
	createGadget,
	deleteGadget,
	getGadgets,
	selfDestruct,
	updateGadget,
} from "../controllers/gadgetController.js";

const gadgetRouter = Router();
gadgetRouter.use(isAuthenticated);
gadgetRouter.get("/", getGadgets);
gadgetRouter.post("/", createGadget);
gadgetRouter.patch("/:id", updateGadget);
gadgetRouter.delete("/:id", deleteGadget);
gadgetRouter.post("/:id/self-destruct", selfDestruct);

export default gadgetRouter;
