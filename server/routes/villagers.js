const Villager = require('../models/Villager');
const villagers = require('express').Router();

villagers.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await Villager.find({}));
    } catch (e) {
        next(e);
    }
});

module.exports = villagers;
