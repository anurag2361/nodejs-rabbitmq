"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const route_1 = __importDefault(require("./routes/route"));
if (fs_1.default.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
callback_api_1.default.connect(process.env.RABBIT_URL, (err, conn) => {
    if (err) {
        throw err;
    }
    else {
        console.log("RabbitMQ Connected");
        module.exports.connection = conn;
    }
});
app.use("/user", route_1.default);
app.listen(process.env.APP_PORT, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log(`App running on http://localhost:${process.env.APP_PORT}`);
    }
});
//# sourceMappingURL=index.js.map