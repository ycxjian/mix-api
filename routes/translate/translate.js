<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var http = require('http');
/* GET home page. */
router.get('/', function (req, res, next) {
    var b = function (a, b) {
        for (var d = 0; d < b.length - 2; d += 3) {
            var c = b.charAt(d + 2),
                c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
                c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
            a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
        }
        return a
    };
    var tk = function (a, TKK) {
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

    // const url = 'http://translate.google.cn/translate_a/single?client=t&sl=zh-CN&tl=en&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=2&ssel=3&tsel=0&kc=1&tk=' + getTK + '&q=' + text;
    const options = {
        hostname: '115.28.190.2',
        port: 80,
        path: '/translate.php?text=' + text + '&tk=' + getTK,
        method: 'GET'
    };

    const request = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (data) {
            const result = JSON.parse(data);
            if (result[0][0][0]) {
                res.send(result[0][0][0]);
            } else {
                res.send('不能用了');
            }
        });
    });
    request.on('error', function (e) {
        res.send("Got error: " + e.message);
    });
    request.write('data\n');
    request.end();
});


module.exports = router;
=======

>>>>>>> 194d889152bc7ba4a34c39fac7fb6d4ebbf0de6a
