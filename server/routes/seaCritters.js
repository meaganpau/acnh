const SeaCritterSchema = require('../models/SeaCritter');
const seaCritters = require('express').Router();

seaCritters.get('/', async (req, res, next) => {
    try {
        await SeaCritterSchema.find({}, (err, data) => {
            res.status(200).json(data);
        });
    } catch (e) {
        next(e);
    }
});

module.exports = seaCritters;
