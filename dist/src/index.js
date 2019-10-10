"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const route_1 = __importDefault(require("./routes/route"));
const port = 9000;
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
callback_api_1.default.connect("amqp://localhost", (err, conn) => {
    if (err) {
        throw err;
    }
    else {
        module.exports.connection = conn;
    }
});
app.use("/user", route_1.default);
app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log(`App running on http://localhost:${port}`);
    }
});
//# sourceMappingURL=index.js.map