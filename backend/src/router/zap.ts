import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware";

const router = Router();

router.post("/", (req, res) => {
  console.log("create a zap");
});

router.get("/", authMiddleware, (req, res) => {
  console.log("get a zap");
});

router.get("/:zapId", authMiddleware, (req, res) => {
  console.log("zap handler");
});

export const zapRouter = router;
