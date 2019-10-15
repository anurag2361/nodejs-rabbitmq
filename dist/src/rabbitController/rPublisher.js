"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToQueue = (channel, queueName, data) => __awaiter(void 0, void 0, void 0, function* () {
    channel.assertQueue(queueName, { durable: true, exclusive: false, autoDelete: true, arguments: { "x-expires": 1800000 } });
    channel.sendToQueue(queueName, Buffer.from(data));
    process.on("exit", (code) => {
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
});
exports.workerFunction = (channel, queuename, data) => __awaiter(void 0, void 0, void 0, function* () {
    channel.assertQueue(queuename, { durable: true });
    channel.sendToQueue(queuename, Buffer.from(data), { persistent: true });
    console.log("Sent '%s'", data);
    process.on("exit", (code) => {
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
});
exports.exchangeFunction = (channel, exchange, data) => __awaiter(void 0, void 0, void 0, function* () {
    channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, "", Buffer.from(data));
    console.log("Sent %s", data);
    process.on("exit", (code) => {
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
});
exports.directExchange = (channel, exchange, severity, data) => __awaiter(void 0, void 0, void 0, function* () {
    channel.assertExchange(exchange, "direct", { durable: false });
    channel.publish(exchange, severity, Buffer.from(data));
    console.log("Sent %s: '%s'", severity, data);
    process.on("exit", (code) => {
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
});
exports.topicExchange = (channel, exchange, key, message) => __awaiter(void 0, void 0, void 0, function* () {
    channel.assertExchange(exchange, "topic", { durable: false });
    channel.publish(exchange, key, Buffer.from(message));
    console.log("Sent %s: '%s'", key, message);
    process.on("exit", (code) => {
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
});
//# sourceMappingURL=rPublisher.js.map