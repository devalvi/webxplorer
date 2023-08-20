const cache = require('../cache')
const { model, Schema } = cache.require('mongoose')

const mediaSchema = new Schema({
    _id: String,
    path: {
        type: String, 
        unique: true
    },
    size: Number,
    date_modified: Date,
    type: String   
})

const indexSchema = new Schema({
    _id: String,
    directory: {
        type: String,
        unique: true
    }
})

const MediaModel = model('Media', mediaSchema)
const IndexModel = model('Index', indexSchema)

module.exports = { MediaModel, IndexModel };