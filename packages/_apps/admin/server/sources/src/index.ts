import express from "express";
import { json } from "body-parser";
import { TEST_COMMON_EXPORTS } from "@dieta/common";

const app = express();
app.use(json());

console.log(TEST_COMMON_EXPORTS);

const PORT = 3081;

app.get("/", (_req, res) => {
    res.send("Admin Server Up");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
