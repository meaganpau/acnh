const Fish = require('../models/Fish');
const fish = require('express').Router();

fish.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await Fish.find({}));
    } catch (e) {
        next(e);
    }
});

module.exports = fish;
