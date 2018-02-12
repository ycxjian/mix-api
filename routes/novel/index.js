var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var util = require('util');

router.get('/', function(req, res, next) {
  res.send(util.inspect(req));
});

router.get('/getip', function(req, res, next) {
  var ip = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];
  res.send(ip);
});

router.get('/getNovelByName', function(req, res, next) {
  // superagent.get('http://api.zhuishushenqi.com/cats/lv2').then((response) => {
    // res.send(response);
  // })
  res.send(req.useragent);
});

module.exports = router;
