import { Router, Response, Request } from "express";
import { login, logout, signup } from "../controller/auth.controller.js";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  console.log("Reached ");
  res.send("auth");
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
