var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var superagent = require('superagent');

router.get('/', function(req, res, next) {
  res.send('谷歌翻译');
});

// 有道翻译接口
router.get('/youdao', function(req, res, next) {
  const text = req.query.text;
  const salt = "" + ((new Date).getTime() + parseInt(10 * Math.random(), 10));
  // const salt = '1519528784301';
  const sign = crypto
    .createHash('md5')
    .update("fanyideskweb" + text + salt + "ebSeFb%=XZ%T[KZ)c(sy!", 'utf-8')
    .digest('hex');
    // res.send({
    //   i: text,
    //   client: 'fanyideskweb',
    //   salt: salt,
    //   sign: sign,
    // });
  superagent
    .post('http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule')
    .send({
      i: text,
      client: 'fanyideskweb',
      salt: salt,
      sign: sign,
    })
    .end(function(response) {
      if (response.ok) {
        res.send(JSON.stringify(response.body));
      } else {
        res.send(response.text);
      }
    });
});

// 谷歌翻译接口，中文转英文，暂时不支持其他转换，其实修改请求参数就行了，哈哈哈
router.get('/index', function(req, res, next) {
  // 下面是网友提供的主要参数的解析函数
  var b = function(a, b) {
    for (var d = 0; d < b.length - 2; d += 3) {
      var c = b.charAt(d + 2),
        c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
        c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
      a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
    }
    return a
  };
  var tk = function(a, TKK) {
    for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
      var c = a.charCodeAt(f);
      128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
    }
    a = h;
    for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
    a = b(a, "+-3^+b+-f");
    a ^= Number(e[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return a.toString() + "." + (a ^ h)
  };
  var TKK = eval('((function(){var a\x3d27329834;var b\x3d2717736125;return 416738+\x27.\x27+(a+b)})())');
  var text = (req.query.text);
  var getTK = tk(text, TKK);
  const url = 'http://translate.google.com/translate_a/t?client=t&sl=zh-CN&tl=en&hl=zh-CN&v=1.0&source=is&tk=' + getTK + '&q=' + text;
  superagent.get(url).then((json) => {
    res.send(json);
  }).catch((err) => {
    res.send(err);
  });
});

module.exports = router;
