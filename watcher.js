const cache = require('./cache');
const chokidar = cache.require('./chokidar')
const database = require('./database');


function watcherUpdater(directory) {
    const watchOptions = {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        ignoreInitial: true
    }
    const watcher = chokidar.watch(directory, watchOptions);

    watcher.on('add', async (file, stat) => {
        const document = database.createReadyDocument(file, stat.size, stat.mtimeMs);
        await database.MediaCollection.create(document);
    })
    watcher.on('change', async (file, stat) => {
        const document = database.createReadyDocument(file, stat.size, stat.mtimeMs);
        delete document._id; // Prevents modifying '_id' property
        delete document.accessed; // Prevents modifying 'accessed' property
        await database.MediaCollection.update({ path: file }, document)
    })
    watcher.on('unlink', async file => {
        await database.MediaCollection.delete({ path: file })
    })
}

module.exports = {
    watcherUpdater
}