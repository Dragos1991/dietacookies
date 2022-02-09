import express from 'express';
import os from 'os';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get('/api/getUsername', (_req, res) => res.send({ test: "test", nume: os.userInfo().username }));

app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT}!`));
