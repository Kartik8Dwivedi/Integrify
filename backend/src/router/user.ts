import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware";

const router = Router();

router.post("/signup", (req, res) =>{
    console.log("signup handler");
})

router.post("/signin", (req, res) =>{
    console.log("login handler");
})

router.get("/user", authMiddleware, (req,res) => {
    console.log("signin handler");
})

export const userRouter = router;