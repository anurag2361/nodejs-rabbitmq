"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
callback_api_1.default.connect("amqp://localhost", (err, conn) => {
    conn.createChannel((err1, ch) => {
        if (err1) {
            throw err1;
        }
        ch.assertQueue("user-messages", { durable: true, exclusive: false, autoDelete: true, arguments: { "x-expires": 1800000 } });
        ch.prefetch(2);
        ch.consume("user-messages", (msg) => {
            console.log(".....");
            setTimeout(() => {
                console.log("Message:", msg.content.toString());
            }, 2000);
        }, { noAck: false });
    });
});
//# sourceMappingURL=rConsumer.js.map