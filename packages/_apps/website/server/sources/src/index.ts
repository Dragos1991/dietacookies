import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(json());
app.use(cors());

const PORT = 3080;

app.get('/', (_req, res) => {
    res.send({
        connection: 'The connection is established',
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
