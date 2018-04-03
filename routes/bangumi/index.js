var express = require('express');
var router = express.Router();
var superagent = require('superagent');

router.get('/', function(req, res, next) {
  superagent
    .get('https://raw.githubusercontent.com/bangumi-data/bangumi-data/master/dist/data.json')
    .end(function(err, response) {
      res.send(response.text);
    });
});

module.exports = router;
