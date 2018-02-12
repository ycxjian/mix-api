var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var util = require('util');

router.get('/', function(req, res, next) {
  res.send(util.inspect(req));
});

router.get('/getNovelByName', function(req, res, next) {
  // superagent.get('http://api.zhuishushenqi.com/cats/lv2').then((response) => {
    // res.send(response);
  // })
  res.send(req.useragent);
});

module.exports = router;
