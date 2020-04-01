const express = require('express')
const routes = express.Router();
const fish = require('./fish');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

routes.use('/fish', fish);

module.exports = routes;