var express = require('express');
var router = express.Router();
var superagent = require('superagent');

router.get('/', function(req, res, next) {
  res.send('谷歌翻译');
});

// 谷歌翻译接口，中文转英文，暂时不支持其他转换，其实修改请求参数就行了，哈哈哈
router.get('/index',function(req, res, next) {
  const text = req.query.text;
  // 下面是网友提供的主要参数的解析函数
  superagent.get(url).then((json)=>{
    res.send(json);
  }).catch((err)=>{
    res.send(err);
  });
});

module.exports = router;
