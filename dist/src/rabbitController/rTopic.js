"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Usage: rTopic.js <key>");
    process.exit(1);
}
callback_api_1.default.connect("amqp://localhost", (err, conn) => {
    if (err) {
        throw err;
    }
    conn.createChannel((err1, ch) => {
        if (err1) {
            throw err1;
        }
        ch.assertExchange("exchange2", "topic", { durable: false });
        ch.assertQueue("", { exclusive: true }, (err2, q) => {
            if (err2) {
                throw err2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            args.forEach((key) => {
                ch.bindQueue(q.queue, "exchange2", key);
            });
            ch.consume(q.queue, (msg) => {
                if (msg.content) {
                    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                }
            }, { noAck: true });
        });
    });
});
//# sourceMappingURL=rTopic.js.map