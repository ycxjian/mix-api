
var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var Api = require('./api.js');

router.get('/', function(req, res, next) {
  res.send('天气');
});

router.get('/weather',function(req, res, next) {
  const location = req.query.location;
  const weatherApi = new Api('U3816B37F8','p3zpi4nz7b0k0ugd');
  const weatherJson = weatherApi.getWeatherNow(location);
  res.send(weatherJson);
});

module.exports = router;
