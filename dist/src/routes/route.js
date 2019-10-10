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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const express_1 = require("express");
const rPublisher_1 = require("../rabbitController/rPublisher");
const router = express_1.Router();
router.get("/hello", (req, res) => {
    res.send("Hello World");
});
router.post("/msg", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { queuename, data } = req.body;
    callback_api_1.default.connect("amqp://localhost", (err, conn) => {
        if (err) {
            throw err;
        }
        else {
            conn.createChannel((err1, channel) => __awaiter(void 0, void 0, void 0, function* () {
                yield rPublisher_1.publishToQueue(channel, queuename, data);
                res.statusCode = 200;
                res.data = { "message-sent": true };
                next();
            }));
        }
    });
}));
exports.default = router;
//# sourceMappingURL=route.js.map