import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ApiIndex from './api/index.js';
import MongooseService from './services/MongooseService.js';

const port = 3001;

MongooseService.init()
    .then(() => console.log('mangodb connected'))
    .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', ApiIndex);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
