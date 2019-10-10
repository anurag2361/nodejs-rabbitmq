import express from "express";
const app = express();
import router from "./routes/route";
const port: number = 9000;

// using express body-parser for form data
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/user", router);

app.listen(port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`App running on http://localhost:${port}`);
    }
});
