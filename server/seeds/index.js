require('dotenv').config()
const seeder = require('mongoose-seed')
const FishData = require('./data/fish.json')

const MONGOOSE_URI = process.env.MONGODB_URI;

seeder.connect(MONGOOSE_URI, function() {
    seeder.loadModels([
        'server/models/Fish.js'
    ])
    seeder.clearModels(['Fish'], function() {
        seeder.populateModels(data, function(err, done) {
            if (err) {
                return console.log('Error: ', err);
            }
            if (done) {
                return console.log('Done: ', err);
            }
            seeder.disconnect()
        })
    })
})

const data = [
    {
        "model": "Fish",
        "documents": FishData
    }
]