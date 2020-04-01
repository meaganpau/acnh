require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const db = mongoose.connection;
const PORT = process.env.PORT;
const MONGOOSE_URI = process.env.MONGODB_URI;

const app = express();
const routes = require('./routes/')

db.on('error', console.error.bind(console, 'connection error:'));

app.use('/', express.static(
  path.join(__dirname, '../build')
))

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(
      path.join(__dirname, '../build/index.html')
  )
})

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    await mongoose
        .connect(MONGOOSE_URI, {
          useUnifiedTopology: true, 
          useNewUrlParser: true,
          useCreateIndex: true
        })
        .then(() => {
          console.log(`Successfully connected to ${MONGOOSE_URI}`);
        })
        .catch(err => console.log(err.message))
});

app.use((err, req, res, next) => {
    res.status(500).json({ err: err.toString() })
})