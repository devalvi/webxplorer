const fs = require('fs')
const path = require('path')
const express = require('express');
const mime = require('mime')
const database = require('../database');
const url = require('url');
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


;(async () => {
  let res = await MediaModel.read({})
  console.log(sort(res, 'ascending').bySize())
})();

router.get('/search?q', async function(request, response){

})

router.get('/:mediatype?sort=alphabet|date|accessed|size&order=ascending|descending&page=<number>', async function(request, response, next) {
  //when GET /<mediatype> default return is for /<mediatype>?sort=date&order=ascending&page=1
  const media = request.params.mediatype
  const order = request.query
  /**
   * 
   * 
   */       

});

router.get('/resource/:id', async function(request, response){

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
router.get('/media', async (request, response) => {
  const all = await MediaModel.read({})
  all.forEach(obj => {
    response.write('<a href="../resource/' + obj._id + '">' + path.basename(obj.path) + '</a><br/>')
  })
  response.end()
})
module.exports = router;
