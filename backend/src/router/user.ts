import { JWT_PASSWORD } from './../config';
import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware";
import { SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) =>{
    const body = req.body.username;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({error: "Invalid data"});
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    })

    if(userExists){
        return res.status(409).json({error: "User already exists"});
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });

    // todo: await sendVerificationEmail(parsedData.data.username);

    return res.json({
        message: "Please verify your account"
    })
})

router.post("/signin", async (req, res) =>{
    const body = req.body.username;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({error: "Invalid inputs"});
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });

    if(!user){
        return res.status(404).json({error: "User not found"});
    }

    // sign the jwt
    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD, {
        expiresIn: "1d"
    });

    return res.json({
        token: token
    });
})

router.get("/user", authMiddleware, async (req,res) => {
    // todo fix types
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id: id
        }, select: {
            name: true,
            email: true
        }
    });

    return res.json({user});
})

export const userRouter = router;