const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeaCritterSchema = new Schema({
    no: {
        type: Number,
        unique: true,
    },
    name: {
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
        type: String,
    },
    south_month_label: {
        type: String,
    },
    image: {
        type: String,
    },
});

const SeaCritter = mongoose.model('SeaCritter', SeaCritterSchema);

module.exports = SeaCritter;
