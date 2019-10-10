"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
callback_api_1.default.connect("amqp://localhost", (err, conn) => {
    conn.createChannel((err, ch) => {
        if (err) {
            throw err;
        }
        ch.assertQueue("user-messages");
        ch.consume("user-messages", (msg) => {
            console.log(".....");
            setTimeout(() => {
                console.log("Message:", msg.content.toString());
            }, 4000);
        }, { noAck: true });
    });
});
//# sourceMappingURL=rConsumer.js.map