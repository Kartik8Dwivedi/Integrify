import express, { Request, Response } from "express";

const app = express();

app.post("/hooks/catch/:userId/:zapId", (req: Request, res: Response) => {
    // Get the user ID and Integrify ID from the URL
    const userId = req.params.userId;
    const zapId = req.params.zapId;

    // Get the data from the request body

    // Store in db to perform a new trigger

    // push it on to a queue(kafka/redis/rabbitmq)

})