const watcher = require('./watcher');
const database = require('./database');
const rootRoute = require('./routes/index');
const config = require('./config');

const source = config.baseDirectory;



(async () => {
    const { IndexModel }  = database.Models;
    const documents = await IndexModel.read({})
    
    if (documents[0]?.directory !== source) {
        await database.Seeder(source)
    }
    watcher.watcherUpdater(source)
})();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

app.get('/', rootRoute)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/', rootRoute);

module.exports = app;