import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
  // Get the user ID and Integrify ID from the URL
  const userId = req.params.userId;
  const zapId = req.params.zapId;

  const body = req.body;

  // Store in db to perform a new trigger
    // creating a transaction in prisma:
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            },
        });

        await tx.zapRunOutbox.create({
            data: {
            zapRunId: run.id,
            },
        });
    });
    res.json({ message: "Success" });
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});