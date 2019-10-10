import amqp from "amqplib/callback_api";
import { Request, Response, Router } from "express";
import { publishToQueue } from "../rabbitController/rPublisher";
const router = Router();

router.post("/msg", async (req: Request, res: Response, next) => {
    const { queuename, data } = req.body;
    amqp.connect("amqp://localhost", (err, conn) => {
        if (err) {
            throw err;
        } else {
            conn.createChannel(async (err1, channel) => {
                if (err1) { throw err1; }
                await publishToQueue(channel, queuename, data);
                res.status(200).send({ message: "sent" });
                next();
            });
        }
    });
});

export default router;
