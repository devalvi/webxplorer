const os = require('os');
const path = require('path')
const cache = require('./cache');
const fs_actions = require('./fs-actions');
const datastore = cache.require('nedb');
const uuid = cache.require('uuid-by-string')


const Models = {};
(function connect(){
    const tempdirectory = os.tmpdir()
    const mediaDirectory = path.join(tempdirectory, '/database/media.db' );
    const indexDirectory = path.join(tempdirectory, '/database/index.db');
    const promisify = (funct, method, document, replacement = null) => {
      if(replacement == undefined){
        return new Promise((resolve, reject) => {

          funct[method](document, function(error, result){
            if (error == undefined) resolve(result);
            reject(error)
          })

        })
      }
        return new Promise((resolve, reject) => {

          funct[method](document, replacement,  function(error, result){
            if (error == undefined) resolve(result);
            reject(error)
          })

        })
    }

    const Media = new datastore({ filename: mediaDirectory, autoload: true });
    const Index = new datastore({ filename: indexDirectory, autoload: true })
    
    const createCollection = (collection) => {
      return {
        create: async (doc) => await promisify(collection, 'insert', doc),
        read: async (doc) => await promisify(collection, 'find', doc),
        update: async (search, replacement) => await promisify(collection, 'update', search, replacement),
        delete: async (doc) => await promisify(collection, 'remove', doc)
      }
    }
    Models.MediaModel = createCollection(Media);
    Models.IndexModel = createCollection(Index);
})();

function isValidType(format){
    const valids = ['audio', 'video', 'document'];
    const validity = valids.includes(format)
    return validity
}

async function createReadyDocument(filepath, size, mtimeMs){

    const properties = {
          type: fs_actions.getFileType(filepath),
          _id:  uuid(filepath)
    }
    if(size === undefined || mtimeMs === undefined){
        const metadata = await fs_actions.getMetadata(filepath);
        properties.size = metadata.size;
        properties.time_modified = metadata.mtimeMs;
    }
    else {
        properties.size = size;
        properties.time_modified = mtimeMs;
    }

    return {
      path: filepath,
      size: size ,
      ...properties
    }
  }
async function Seeder(source){
    const files = await fs_actions.ListFiles(source);

    await Models.IndexModel.delete({});
    await Models.MediaModel.delete({});

    const saveable = files.filter(file => isValidType(fs_actions.getFileType(file)) ? file : false);
    saveable.forEach(async absolutepath => {
        const document = await createReadyDocument(absolutepath);
        await Models.MediaModel.create(document);
    })
    await Models.IndexModel.create({
       _id: uuid(source),
       directory: source
      })
}

module.exports = { Models, createReadyDocument, isValidType, Seeder }
