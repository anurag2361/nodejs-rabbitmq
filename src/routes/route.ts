import { Request, Response, Router } from "express";
import { directExchange, exchangeFunction, publishToQueue, topicExchange, workerFunction } from "../rabbitController/rPublisher"; // publisher function imported
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

// this is a worker queue connection. run rWorker.js for this
router.post("/worker", async (req: Request, res: Response) => {
    const message = req.body.message;
    const queuename = req.body.queuename; // send queuename as 'worker'
    conn.connection.createChannel(async (err1, channel) => {
        if (err1) { throw err1; }
        await workerFunction(channel, queuename, message);
        res.status(200).send({ message: "Sent" });
    });
});

// this sends message to exchange instead of queue. run rExchange for this.
router.post("/exchange", async (req: Request, res: Response) => {
    const { message, exchange } = req.body; // pass 'exchange' as exchange
    conn.connection.createChannel(async (err1, channel) => {
        if (err1) { throw err1; }
        await exchangeFunction(channel, exchange, message);
        res.status(200).send({ message: "Sent" });
    });
});

// this implements direct exchange. Run rRouting for this.
router.post("/routing", async (req: Request, res: Response) => {
    const { message, exchange, severity } = req.body; // pass 'exchange1' as exchange and severity as info,warning or error
    conn.connection.createChannel(async (err1, channel) => {
        if (err1) { throw err1; }
        await directExchange(channel, exchange, severity, message);
        res.status(200).send({ message: "Sent" });
    });
});

// this implements topic exchange. run rTopic.js for this. Messages can be sent according to a topic.
router.post("/topic", async (req: Request, res: Response) => {
    const { message, exchange, key } = req.body; // pass exchange as exchange2 and key as newtopic
    conn.connection.createChannel(async (err1, channel) => {
        if (err1) { throw err1; }
        await topicExchange(channel, exchange, key, message);
        res.status(200).send({ message: "Sent" });
    });
});

export default router;
