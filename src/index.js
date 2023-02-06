import express from 'express';
import bodyParser from 'body-parser';

import ApiIndex from './api/index.js';
import MongooseService from './services/MongooseService.js';

const port = 3000;

MongooseService.init()
    .then(() => console.log('mangodb connected'))
    .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Express + JS Server');
});

app.use('/api', ApiIndex);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
