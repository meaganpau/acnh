const BugSchema = require('../models/Bug');
const bugs = require('express').Router();

bugs.get('/', async (req, res, next) => {
    try {
        await BugSchema.find({}, (err, data) => {
            res.status(200).json(data);
        });
    } catch(e) {
        next(e);
    }
})

module.exports = bugs;
