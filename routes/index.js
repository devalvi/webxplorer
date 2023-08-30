const fs = require('fs')
const path = require('path')
const express = require('express');
const cache = require('../cache')
const mime = cache.require('mime')
const database = require('../database');
const url = require('url');
const { MediaModel } = database.Models;
const router = express.Router();
/** 
 * search route
 */
router.get('/search', async function(request, response){
    const { query } = request.query;
    // search whole dataset for instances matching query, return array of items
    const result = await MediaModel.read({})
})

router.get('/:mediatype', async function(request, response) {
  //?sort=alphabet|date|accessed|size&order=ascending|descending&page=<number>
  const media = request.params.mediatype
  // const { page, sort, order } = request.query

    response.json({results: await MediaModel.read({ type: media})})

  /**
   * 
   * 
   */       

});
 
router.get('/media/:id', async function(request, response){

  const fileID = request.params.id;
  const data = await MediaModel.read({_id : fileID});

  if (data.length === 0) return response
                          .status(404)
                          .send('Resource cannot be found!');

  const { path : filepath, size: length } = data[0];
  const contentType = mime.lookup(filepath)
  const headers = {
    'Content-Type': contentType,
    'Content-Length': length
  }

  response.writeHead(200, headers);
  fs.createReadStream(filepath).pipe(response)
});

module.exports = router;
