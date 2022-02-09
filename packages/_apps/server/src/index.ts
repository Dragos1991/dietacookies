import express from 'express';
import os from 'os';

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (_req, res) => res.send({ test: 'test2', nume: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${8080}!`));
