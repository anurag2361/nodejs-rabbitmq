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
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const route_1 = __importDefault(require("./routes/route"));
const port = 9000;
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/hey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("hello");
    }
    catch (error) {
        console.log(error);
    }
}));
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