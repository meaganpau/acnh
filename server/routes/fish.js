const FishSchema = require('../models/Fish');
const fish = require('express').Router();

fish.get('/', async (req, res, next) => {
    try {
        await FishSchema.find({}, (err, data) => {
            res.status(200).json(data);
        });
    } catch(e) {
        next(e);
    }
})

module.exports = fish;
