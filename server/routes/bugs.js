const Bug = require('../models/Bug');
const bugs = require('express').Router();

bugs.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await Bug.find({}));
    } catch (e) {
        next(e);
    }
});

module.exports = bugs;
