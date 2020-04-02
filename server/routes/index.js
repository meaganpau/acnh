const express = require('express')
const routes = express.Router();
const fish = require('./fish');
const bugs = require('./bugs');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

routes.use('/fish', fish);
routes.use('/bugs', bugs);

module.exports = routes;