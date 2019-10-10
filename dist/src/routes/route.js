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
const express_1 = require("express");
const rPublisher_1 = require("../rabbitController/rPublisher");
const conn = require("./../index");
const router = express_1.Router();
router.post("/msg", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { queuename, data } = req.body;
    conn.connection.createChannel((err1, channel) => __awaiter(void 0, void 0, void 0, function* () {
        if (err1) {
            throw err1;
        }
        yield rPublisher_1.publishToQueue(channel, queuename, data);
        res.status(200).send({ message: "sent" });
        next();
    }));
}));
exports.default = router;
//# sourceMappingURL=route.js.map