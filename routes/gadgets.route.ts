import { Router } from "express";
import {
  addGadgets,
  deleteGadgets,
  getGadgets,
  selfDestructGadget,
  updateGadgets,
} from "../controller/gadgets.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const gadgetsRoutes = Router();

gadgetsRoutes.get("/", protectRoute, getGadgets);
gadgetsRoutes.post("/", protectRoute, addGadgets);
gadgetsRoutes.patch("/:id", protectRoute, updateGadgets);
gadgetsRoutes.delete("/:id", protectRoute, deleteGadgets);
gadgetsRoutes.post("/:id/self-destruct", protectRoute, selfDestructGadget);

export default gadgetsRoutes;
