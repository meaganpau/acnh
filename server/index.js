require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 8000;
const MONGOOSE_URI = process.env.MONGODB_URI;

if (!MONGOOSE_URI) {
    console.error(
        'MONGODB_URI is not set. Copy .env.example to .env and set it (see README.md).'
    );
    process.exit(1);
}

const app = express();
const routes = require('./routes/');

mongoose.connection.on('error', err =>
    console.error('MongoDB connection error:', err.message)
);

app.use('/', express.static(path.join(__dirname, '../build')));

app.use('/api', routes);

// Send every other URL to the React app so client-side routing works
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).json({ err: err.toString() });
});

async function start() {
    try {
        await mongoose.connect(MONGOOSE_URI, { serverSelectionTimeoutMS: 5000 });
    } catch (err) {
        console.error(`Could not connect to MongoDB: ${err.message}`);
        process.exit(1);
    }
    // Log the host and database only, never the full URI (it contains the password)
    const { host, port, name } = mongoose.connection;
    console.log(`Connected to MongoDB: ${host}${port ? `:${port}` : ''}/${name}`);

    app.listen(PORT, err => {
        if (err) {
            console.error(`Could not listen on port ${PORT}: ${err.message}`);
            process.exit(1);
        }
        console.log(`Listening on port ${PORT}`);
    });
}

start();
