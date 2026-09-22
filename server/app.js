const express = require('express');
const path = require('path');
const routes = require('./routes/');

// Builds the Express app. `serveStatic: true` (the default) also serves the
// CRA build/ folder and falls back to index.html for client-side routing —
// this is what the local dev server and the droplet use. Vercel serves
// build/ itself via its own static hosting, so its entry point
// (api/index.js) passes `serveStatic: false` to skip all of that and only
// handle /api requests.
function createApp({ serveStatic = true } = {}) {
    const app = express();

    if (serveStatic) {
        app.use('/', express.static(path.join(__dirname, '../build')));
    }

    app.use('/api', routes);

    if (serveStatic) {
        // Send every other URL to the React app so client-side routing works
        app.get('/{*splat}', (req, res) => {
            res.sendFile(path.join(__dirname, '../build/index.html'));
        });
    }

    app.use((err, req, res, next) => {
        res.status(500).json({ err: err.toString() });
    });

    return app;
}

module.exports = { createApp };
