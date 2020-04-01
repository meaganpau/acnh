require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const PORT = process.env.PORT;
const MONGOOSE_URI = process.env.MONGODB_URI;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true);

const app = express();
const routes = require('./routes/')

db.on('error', console.error.bind(console, 'connection error:'));

app.use('/api', routes);

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    await mongoose
        .connect(MONGOOSE_URI)
        .then(() => {
          console.log(`Successfully connected to ${MONGOOSE_URI}`);
        })
        .catch(err => console.log(err.message))
});

app.use((err, req, res, next) => {
    res.status(500).json({ err: err.toString() })
})