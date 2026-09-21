# acnh (Critterdex)

Browse the fish, bugs, sea creatures and villagers of Animal Crossing: New Horizons.

**Live:** https://critterdex.meaganpau.com/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How the pieces fit together

Running the app locally means running **three separate programs**. All three need to be up at the same time:

| Program | What it is | How to start it | Port |
| --- | --- | --- | --- |
| MongoDB | the database | `brew services start mongodb-community@8.3` (once, see below) | 27017 |
| `yarn server` | the Express API | in a terminal | 8000 |
| `yarn start` | the React app (dev server) | in a second terminal | 3100 |

The React app asks for data at `/api/...`, and the `"proxy"` setting in `package.json` forwards those requests to the API on port 8000. **`yarn server` does not start MongoDB.** It only connects to it.

## Run it locally

You need **Node 20.19 or newer** (`.nvmrc` says 24) and Yarn 1. Last tested with Node v26.3.1, Yarn 1.22, and MongoDB 8.3 installed with Homebrew on a Mac.

### One-time setup

1. **Install the dependencies:**

   ```
   yarn
   ```

2. **Install and start MongoDB** (needs [Homebrew](https://brew.sh)):

   ```
   brew tap mongodb/brew
   brew trust mongodb/brew
   brew update
   brew install mongodb-community@8.3
   brew services start mongodb-community@8.3
   ```

   `brew services` keeps MongoDB running in the background and starts it again when you log in, so this is a one-time step. Check it with `brew services list` (it should say `started`). If macOS blocks it, go to System Settings > Privacy & Security and click **Open Anyway**.

3. **Create your `.env` file:**

   ```
   cp .env.example .env
   ```

   The defaults work for local development (see [Environment variables](#environment-variables)).

4. **Load the data into your local database** (run this from the project's top-level folder):

   ```
   yarn seed
   ```

   This fills the database from the JSON files in `server/seeds/data`, prints how many documents it loaded, and exits.

   > **Careful:** `yarn seed` first **deletes** the fish, bugs, sea creatures and villagers collections in whatever database `MONGODB_URI` points to. Only run it while `.env` points at your local MongoDB (`mongodb://127.0.0.1...`), never at the production database. To protect you, the seed script refuses to run unless `MONGODB_URI` points at a local MongoDB. (You can override that with `SEED_ALLOW_REMOTE=true yarn seed`, but only do that on purpose.)

### Every time you want to work on it

MongoDB should already be running (`brew services list`). Then, in two terminals:

```
yarn server     # terminal 1: API on http://localhost:8000
yarn start      # terminal 2: app on http://localhost:3100
```

`yarn server` restarts by itself when you change a server file, but **not** when you edit `.env`. After changing `.env`, stop it with `Ctrl+C` and start it again.

Open http://localhost:3100. If the page loads but the tables are empty or stuck loading, check that MongoDB is running (`brew services list`) and look at what `yarn server` printed. If it can't reach the database it exits after 5 seconds with a message saying so.

### Looking at the database

[MongoDB Compass](https://www.mongodb.com/products/tools/compass) is a free app for browsing the data. Install it with `brew install --cask mongodb-compass`, then connect to `mongodb://127.0.0.1:27017`. The data is in the `acnh` database.

### Trying the production build locally (optional)

```
yarn build
yarn server
```

The Express server also serves the built app, so it is at http://localhost:8000.

## Environment variables

They live in a file called `.env` in the project's top-level folder. It is not committed to git. `.env.example` is the template.

| Variable | What it does | Local value |
| --- | --- | --- |
| `PORT` | Port for the Express API. Must match `"proxy"` in `package.json`. | `8000` |
| `MONGODB_URI` | Where the database is. | `mongodb://127.0.0.1:27017/acnh` |

The React dev server's port (3100) is set in the `start` script in `package.json`, not in `.env`. If both used `PORT`, the API and the React app would fight over the same port.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn start` | Runs the React app in development on port 3100 |
| `yarn server` | Runs the API (auto-restarts when files change) |
| `yarn seed` | Empties and reloads the database from `server/seeds/data` (local MongoDB only) |
| `yarn build` | Builds the React app into `build/` |
| `yarn test` | Runs the tests |

## Checking for vulnerable packages

Only three packages run on the server: `express`, `mongoose` and `dotenv` (listed under `dependencies` in `package.json`). Everything else is used to build the React app on your computer and is listed under `devDependencies`. It never runs on the server.

```
yarn audit --groups dependencies    # what the live server runs (this is the one that matters)
yarn audit                          # everything, including build tools (long, mostly noise)
yarn outdated                       # what has newer versions
```

A vulnerability in a build tool can affect your laptop while you build, but it can't be reached through the website.

## Production

The live site runs on a DigitalOcean server, managed by [pm2](https://pm2.keymetrics.io/), with its database on MongoDB Atlas. pm2 runs `/var/www/critterdex.meaganpau.com/html/server/index.js` from that same `server` folder, so the production `.env` is `/var/www/critterdex.meaganpau.com/html/server/.env`. (`dotenv` reads `.env` from the folder the process was started in.) The built React app is served from `/var/www/critterdex.meaganpau.com/html/build`.

The `Procfile` and the `heroku-postbuild` script are leftovers from when the app ran on Heroku.

## Stack

MERN: MongoDB, Express, React, Node.js. React 16 (Create React App 5), Express 5, and Mongoose 9 for the database.
