const SeaCreatureSchema = require('../models/SeaCreature');
const seaCreatures = require('express').Router();

seaCreatures.get('/', async (req, res, next) => {
    try {
        await SeaCreatureSchema.find({}, (err, data) => {
            res.status(200).json(data);
        });
    } catch (e) {
        next(e);
    }
});

module.exports = seaCreatures;
