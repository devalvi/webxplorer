const fs = require('fs')
const path = require('path')
const cache = require('../cache')
const express = cache.require('express');
const mime = cache.require('mime')
const database = require('../database');
const { MediaModel } = database.Models;
const router = express.Router();
// database.connect()
/*
* /(video | audio | document )/?sort=(large-small | old-new | A-Z | mostplayed-leastplayed)&page=1
* /:filepath* ()
*
*
*
*/

const sortAccordingTo = {
  size: () => {

  },
  date: () => {

  },
  alphabet: () => {

  },
  frequency: () => {

  }
};


router.get('/:mediatype/?sort=largetosmall', async function(request, response, next) {
  const media = request.params.mediatype
  /**
   * 
   * 
   */

});

router.get('/resource/:id', async function(request, response){

  const fileID = request.params.id;
  const data = await MediaModel.read({_id : fileID});

  if (data.length == 0) return response
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
router.get('/media', async (request, response) => {
  const all = await MediaModel.read({})
  all.forEach(obj => {
    response.write('<a href="../resource/' + obj._id + '">' + path.basename(obj.path) + '</a><br/>')
  })
  response.end()
})
module.exports = router;
