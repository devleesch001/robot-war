import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import ApiIndex from './api/index.js';
import MongooseService from './services/MongooseService.js';

const port = process.env.PORT || 3001;

MongooseService.init()
    .then(() => console.log('[MongoDB]: Connected to MongoDB'))
    .catch((err) => console.error('[MongoDB]: Connection error:', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes first
app.use('/api', ApiIndex);

// Serve React build static files
app.use(express.static(path.join(process.cwd(), 'ui')));
console.log(`[server]: Serving React static files from: ${path.join(process.cwd(), 'ui', 'build')}`);

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`[server]: Server is running at http://0.0.0.0:${port}`);
});

// Graceful shutdown
const shutdown = async () => {
    console.log('INFO  Gracefully shutting down. Please wait...');
    server.close(async (err) => {
        if (err) {
            console.error('Error closing HTTP server:', err);
            process.exit(1);
        }
        try {
            await MongooseService.close?.();
        } catch (e) {
            console.error('Error closing MongoDB:', e);
        }
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
