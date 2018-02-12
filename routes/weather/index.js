
var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var weatherApi = require('./api.js');

router.get('/', function(req, res, next) {
  res.send('天气');
});

module.exports = router;
