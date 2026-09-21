const SeaCreature = require('../models/SeaCreature');
const seaCreatures = require('express').Router();

seaCreatures.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await SeaCreature.find({}));
    } catch (e) {
        next(e);
    }
});

module.exports = seaCreatures;
