const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fishSchema = new Schema({
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
    specific_location: {
        type: String,
    },
    weather: {
        type: String,
    },
    shadow: {
        type: String,
    },
    fin: {
        type: Boolean,
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

const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;

