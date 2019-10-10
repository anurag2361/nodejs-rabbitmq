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
    console.log(queueName, data);
    channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
    process.on("exit", (code) => {
        channel.close();
        console.log(`Closing rabbitmq channel`);
    });
});
//# sourceMappingURL=rPublisher.js.map