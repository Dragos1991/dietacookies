import express from "express";
import { json } from "body-parser";
import { TEST_COMMON_EXPORTS } from "@dieta/common";

const app = express();
app.use(json());

const PORT = 3080;

console.log("test", TEST_COMMON_EXPORTS);

app.get("/", (_req, res) => {
    res.send("Website Server Up");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
