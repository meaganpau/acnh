const express = require('express');
const routes = express.Router();
const fish = require('./fish');
const bugs = require('./bugs');
const villagers = require('./villagers');

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!',
    });
});

routes.use('/fish', fish);
routes.use('/bugs', bugs);
routes.use('/villagers', villagers);
routes.use('/sea-critters', villagers);

module.exports = routes;
