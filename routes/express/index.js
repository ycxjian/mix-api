var express = require('express');
var router = express.Router();
var superagent = require('superagent');

router.get('/', function(req, res, next) {
  const co = req.query.co || '';
  var url = 'http://www.kuaidi.com/index-ajaxselectcourierinfo-' + req.query.nu + '-'+ co +'.html';
  superagent.get(url).then((json) => {
    res.send(json.text);
  }).catch((err) => {
    res.send(err);
  });
});

module.exports = router;
