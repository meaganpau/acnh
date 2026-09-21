// Empties the fish, bug, sea creature and villager collections and reloads
// them from server/seeds/data. Run from the project's top-level folder: yarn seed
require('dotenv').config();
const mongoose = require('mongoose');

const Fish = require('../models/Fish');
const Bug = require('../models/Bug');
const SeaCreature = require('../models/SeaCreature');
const Villager = require('../models/Villager');

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MONGODB_URI is not set. See README.md.');
    process.exit(1);
}

// Seeding deletes existing data, so only allow a local MongoDB unless told otherwise
const isLocal = /^mongodb:\/\/(?:[^@/]*@)?(?:127\.0\.0\.1|localhost|\[::1\])(?::\d+)?(?:[/?]|$)/.test(uri);
if (!isLocal && process.env.SEED_ALLOW_REMOTE !== 'true') {
    console.error(
        'Refusing to seed: MONGODB_URI does not point at a local MongoDB, and seeding deletes existing data.\n' +
            'To seed a remote database on purpose, run: SEED_ALLOW_REMOTE=true yarn seed'
    );
    process.exit(1);
}

const seeds = [
    { Model: Fish, documents: require('./data/fish.json') },
    { Model: Bug, documents: require('./data/bugs.json') },
    { Model: SeaCreature, documents: require('./data/seaCreatures.json') },
    { Model: Villager, documents: require('./data/villagers.json') },
];

async function seed() {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    const { host, port, name } = mongoose.connection;
    console.log(`Seeding ${host}${port ? `:${port}` : ''}/${name}`);

    for (const { Model, documents } of seeds) {
        await Model.deleteMany({});
        const inserted = await Model.insertMany(documents);
        console.log(`  ${Model.modelName}: ${inserted.length} documents`);
    }
    console.log('Done.');
}

seed()
    .catch(err => {
        console.error(`Seeding failed: ${err.message}`);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
