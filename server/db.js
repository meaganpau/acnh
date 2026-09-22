const mongoose = require('mongoose');

// Reuses the MongoDB connection across invocations. On Vercel, a serverless
// function instance can stay "warm" and handle multiple requests, so
// without this, every request that hit a cold path would open a brand new
// connection and could exhaust Atlas's connection limit. Locally this just
// means we connect once at startup, same as before this refactor.
let cached = global._mongooseConn;
if (!cached) {
    cached = global._mongooseConn = { conn: null, promise: null };
}

async function connectToDatabase() {
    const MONGODB_URI = process.env.MONGODB_URI;

    // TEMPORARY DIAGNOSTIC — remove once the Vercel auth issue is resolved.
    // Logs only length + a hash, never the actual credentials, so this is
    // safe to leave in Vercel's logs in the meantime.
    if (MONGODB_URI) {
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256').update(MONGODB_URI).digest('hex').slice(0, 12);
        console.log(`[debug] MONGODB_URI length=${MONGODB_URI.length} sha256[0:12]=${hash}`);
    }

    if (!MONGODB_URI) {
        throw new Error(
            'MONGODB_URI is not set. Copy .env.example to .env and set it (see README.md).'
        );
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
            .then((mongooseInstance) => {
                const { host, port, name } = mongooseInstance.connection;
                console.log(`Connected to MongoDB: ${host}${port ? `:${port}` : ''}/${name}`);
                return mongooseInstance;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        // Let the next call retry instead of getting stuck on a failed promise.
        cached.promise = null;
        throw err;
    }

    return cached.conn;
}

module.exports = { connectToDatabase };
