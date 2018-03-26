var express = require('express');
var router = express.Router();
var superagent = require('superagent');

router.get('/:arg', function(req, res, next) {
  if (arg === '') const url = "https://interface.meiriyiwen.com/article/today?dev=1";
  if (arg === 'random') const url = "https://interface.meiriyiwen.com/article/random?dev=1";
  if (arg === 'date') const url = "https://interface.meiriyiwen.com/article/day?dev=1&date=" + req.query.date;
  superagent.get(url).then((json) => {
    res.send(json);
  }).catch((err) => {
    res.send(err);
  });
});
