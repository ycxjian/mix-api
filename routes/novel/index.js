var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var category = require('./api.js');
var book = require('./api.js');
var rank = require('./api.js');
var comment = require('./api.js');
var bookList = require('./api.js');

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

// 获取带书籍数量的父级分类（包含子类）
router.get('/category',function(req, res, next) {
  superagent.get(category.categoryWithSubCategories).then((json)=>{
    res.send(json);
  }).catch((err)=>{
    res.send(err);
  });
});

module.exports = router;
