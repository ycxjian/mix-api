var express = require('express');
var router = express.Router();
var superagent = require('superagent');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

/** router.all('*', function(req, res, next) {
  var jsonData = myCache.get("jsonData");
  if (jsonData === undefined) {
      superagent
      .get('https://raw.githubusercontent.com/bangumi-data/bangumi-data/master/dist/data.json')
      .end(function(err, response) {
        myCache.set("jsonData", response.text, 86400);
      });
  } else {
    next();
  }
}); **/

router.get('/', function(req, res, next) {
  var jsonData = myCache.get("jsonData");
  if (jsonData === undefined) {
      superagent
      .get('https://raw.githubusercontent.com/bangumi-data/bangumi-data/master/dist/data.json')
      .end(function(err, response) {
        myCache.set("jsonData", response.text, 86400);
        jsonData = myCache.get("jsonData");
        res.send(jsonData);
      });
  } else {
    res.send(jsonData);
  }
});

module.exports = router;
