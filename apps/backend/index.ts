import jwt from "jsonwebtoken";
import express from "express";
import { prisma } from "db";

const app = express();
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {
    const { username, password} = req.body;

    if (!username || !password) {
        res.status(411).json();
        return;
    }

    const response = await prisma.user.create({
        data:{
            username,
            password
        }
    })

    res.json({
        id: response.id
    })
})

app.post("/api/v1/signin", async (req, res) => {
    const { username, password} = req.body;

    if (!username || !password) {
        res.status(411).json();
        return;
    }

    const response = await prisma.user.findFirst({
        where:{
            username,
            password
        }
    })

    if (!response) {
        res.status(403).json({
            message: "Incorrect creds"
        })
        return
    }

    res.json({
        token: jwt.sign({
            userId: response.id
        }, process.env.JWT_SECRET!)
    })
})

app.listen(3000);