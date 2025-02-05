import { Router, Response, Request } from "express";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  console.log("Reached ");
  res.send("auth");
});

router.post("/signup", () => {});
router.post("/login", () => {});
router.post("/logout", () => {});

export default router;
