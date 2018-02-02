var express = require('express');
var router = express.Router();
var superagent = require('superagent');
const musicAPI = require('music-api');

router.get('/', function(req, res, next) {
  res.send('nihao');
});

router.get('/search', function(req, res, next) {
  musicAPI.searchSong('netease', {
      key: '周杰伦',
      limit: 10,
      page: 1,
    })
    .then(response => res.send(response))
    .catch(err => res.send(err))
});

module.exports = router;

