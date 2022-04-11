import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { TEST_COMMON_EXPORTS } from "@dieta/common";

const app = express();
app.use(json());
app.use(cors());

const PORT = 3080;

console.log(TEST_COMMON_EXPORTS);

app.get("/", (_req, res) => {
    res.send({
        connection: "The connection is established",
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
