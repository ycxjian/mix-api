var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var NodeCache = require("node-cache");
var myCache = new NodeCache();
var fs = require('fs');

var localData = '';

var jsonData = '';

router.all('*', function (req, res, next) {
    try {
        localData = JSON.parse(fs.readFileSync('routes/bangumi/data.json'));
    } catch (err) {
        getNewData();
        res.send('后端数据不存在');
    }
    // 从缓存中加载数据
    jsonData = myCache.get("jsonData");
    // 如果缓存中没有相关数据
    if (jsonData === undefined) {
        // 将本地数据写入jsonData，必须保证localData是存在的
        jsonData = localData;
        myCache.set("jsonData", jsonData, 86400);
        getNewData();
        next();
    } else {
        next();
    }
});

router.get('/', function (req, res, next) {
    res.send(jsonData);
});

router.get('/search', function (req, res, next) {
    var result = [];
    const name = req.query.name;
    const bangumi = JSON.parse(jsonData);
    const bangumiItems = bangumi.items;
    var flag = false;
    bangumiItems.forEach((item, index)=> {
        // 对所有的可能情况进行逐一判断
        if (item.title.indexOf(name) >= 0) {
            flag = true;
        }
        if (!flag) {
            const enTranslate = item.titleTranslate.en || [];
            const zhTranslate = item.titleTranslate['zh-Hans'] || [];
            for (let enItem in enTranslate) {
                if (enTranslate[enItem].indexOf(name) >= 0) {
                    flag = true;
                }
            }
            for (let zhItem in zhTranslate) {
                if (zhTranslate[zhItem].indexOf(name) >= 0) {
                    flag = true;
                }
            }
        }
        if (flag) {
            result.push(item);
        }
        flag = false;
    });
    res.send(JSON.stringify(result));
});

function getNewData() {
    superagent
        .get('https://raw.githubusercontent.com/bangumi-data/bangumi-data/master/dist/data.json')
        .end(function (err, response) {
            fs.writeFile('routes/bangumi/data.json', JSON.stringify(response.text))
        });
}

module.exports = router;
