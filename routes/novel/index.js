var express = require('express');
var router = express.Router();
var superagent = require('superagent');

router.get('/', function(req, res, next) {
  res.send(req);
});

router.get('/getNovelByName', function(req, res, next) {
  // superagent.get('http://api.zhuishushenqi.com/cats/lv2').then((response) => {
    // res.send(response);
  // })
  res.send(req.useragent);
});

module.exports = router;
