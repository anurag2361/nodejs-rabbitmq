import { Request, Response, Router } from "express";
import { publishToQueue } from "../rabbitController/rPublisher"; // publisher function imported
// tslint:disable-next-line: no-var-requires
const conn = require("./../index"); // importing rabbitmq connection object from Index.
const router = Router();  // express router mounted.

router.post("/msg", async (req: Request, res: Response, next) => {
    const { queuename, data } = req.body;  // data to be passed to RabbitMQ.
    conn.connection.createChannel(async (err1, channel) => {  // creating channel and calling publisher function.
        if (err1) { throw err1; }
        await publishToQueue(channel, queuename, data);
        res.status(200).send({ message: "sent" });
        next();
    });
});

export default router;
