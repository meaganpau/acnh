const VillagerSchema = require('../models/Villager');
const villagers = require('express').Router();

villagers.get('/', async (req, res, next) => {
    try {
        await VillagerSchema.find({}, (err, data) => {
            res.status(200).json(data);
        });
    } catch(e) {
        next(e);
    }
})

module.exports = villagers;
