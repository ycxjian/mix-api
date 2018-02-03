var express = require('express');
var router = express.Router();
var superagent = require('superagent');
const musicAPI = require('music-api');

router.get('/', function(req, res, next) {
  res.send('nihao');
});

router.get('/search', function(req, res, next) {
  const keyword = req.query.key;
  musicAPI.searchSong('netease', {
      key: keyword,
      limit: 10,
      page: 1,
    })
    .then(response => res.send(response))
    .catch(err => res.send(err))
});

router.get('/song', function(req, res, next) {
  const songId = req.query.songId;
  const vender = req.query.vender;
  musicAPI.getSong(vender, {
      id: songId,
    })
    .then(response => res.send(response))
    .catch(err => res.send(err))
});

module.exports = router;

