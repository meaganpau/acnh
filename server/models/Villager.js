const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const villagerSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    species: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    catchphrase: {
        type: String,
    },
    personality: {
        type: String,
    },
    sex: {
        type: String,
    },
    filename: {
        type: String,
    },
});

const Villager = mongoose.model('Villager', villagerSchema);

module.exports = Villager;

