"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
callback_api_1.default.connect("amqp://localhost", (err, conn) => {
    if (err) {
        throw err;
    }
    conn.createChannel((err1, ch) => {
        if (err1) {
            throw err1;
        }
        ch.assertQueue("worker", { durable: true });
        ch.consume("worker", (msg) => {
            const seconds = msg.content.toString().split(".").length - 1;
            console.log("Recieved %s", msg.content.toString());
            setTimeout(() => {
                console.log("Done");
            }, seconds * 1000);
        }, { noAck: true });
    });
});
//# sourceMappingURL=rWorker.js.map