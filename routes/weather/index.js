
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
  weatherApi.getWeatherNow(location).then((json)=>{
    res.send(json);
  }).catch((err)=>{
    res.send(err);
  });
});

module.exports = router;
