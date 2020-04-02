require('dotenv').config()
const seeder = require('mongoose-seed')
const FishData = require('./data/fish.json')
const BugData = require('./data/bugs.json')

const MONGOOSE_URI = process.env.MONGODB_URI;

seeder.connect(MONGOOSE_URI, function() {
    seeder.loadModels([
        'server/models/Fish.js',
        'server/models/Bug.js',
    ])
    seeder.clearModels(['Fish', 'Bug'], function() {
        seeder.populateModels(data, function(err, done) {
            if (err) {
                return console.log('Error: ', err);
            }
            if (done) {
                return console.log('Done: ', done);
            }
            seeder.disconnect()
        })
    })
})

const data = [
    {
        "model": "Fish",
        "documents": FishData
    },
    {
        "model": "Bug",
        "documents": BugData
    }
]