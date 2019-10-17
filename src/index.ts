import amqp from "amqplib/callback_api";    // importing rabbitMQ library
import * as dotenv from "dotenv";
import express, { Express } from "express";
import fs from "fs";
const app: Express = express();
import router from "./routes/route";

if (fs.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

// using express body-parser for form data
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// creating a single connection to Rabbitmq and exporting connection object;
amqp.connect(process.env.RABBIT_URL, (err, conn: amqp.Connection) => {
    if (err) {
        throw err;
    } else {
        console.log("RabbitMQ Connected");
        module.exports.connection = conn;
    }
});

app.use("/user", router);

app.listen(process.env.APP_PORT, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`App running on http://localhost:${process.env.APP_PORT}`);
    }
});
