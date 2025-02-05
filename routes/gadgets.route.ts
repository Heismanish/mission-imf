import { Router } from "express";
import { addGadgets, getGadgets } from "../controller/gadgets.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const gadgetsRoutes = Router();

gadgetsRoutes.get("/", protectRoute, getGadgets);
gadgetsRoutes.post("/", protectRoute, addGadgets);

export default gadgetsRoutes;
