const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugSchema = new Schema({
    no: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    weather: {
        type: String,
    },
    value: {
        type: Number,
    },
    time: {
        type: [String],
    },
    north_months: {
        type: [String],
    },
    south_months: {
        type: [String],
    },
    north_month_label: {
        type: String
    },
    south_month_label: {
        type: String
    },
    image: {
        type: String
    }
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;

