var express = require('express');
var router = express.Router();
var superagent = require('superagent');

router.get('/', function(req, res, next) {
  superagent
    .get('http://raw.githubusercontent.com/bangumi-data/bangumi-data/master/dist/data.json')
    .set('rejectUnauthorized', false)
    .end(function(err, response) {
      res.send(err);
    });
});

module.exports = router;
