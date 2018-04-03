var express = require('express');
var router = express.Router();
var superagent = require('superagent');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get('/', function(req, res, next) {
  try {
    const jsonData = myCache.get("jsonData", true);
  } catch( geterr ){
    superagent
    .get('https://raw.githubusercontent.com/bangumi-data/bangumi-data/master/dist/data.json')
    .end(function(err, response) {
      myCache.set("jsonData", response.text, 86400);
    });
  }
  res.send(jsonData);
});

module.exports = router;
