var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var api = {
  // 带书籍数量的父分类
  categoryWithBookCount: {
    url: 'http://api.zhuishushenqi.com/cats/lv2/statistics',
    type: 'query',
  },
  // 带子分类的父分类
  categoryWithSubCategories: {
    url: 'http://api.zhuishushenqi.com/cats/lv2',
    type: 'query'
  },
  // 分类详情: 带着书籍
  categoryInfo: {
    url: 'http://api.zhuishushenqi.com/book/by-categories',
    type: 'query'
  },
  // 书籍详情
  bookInfo: {
    url: 'http://api.zhuishushenqi.com/book/:param',
    type: 'params',
    urlparams: {
      param: 'id',
    }
  }, // id 书籍id
  // 相关推荐
  relatedRecommendedBooks: {
    url: 'http://api.zhuishushenqi.com/book/:param/recommend',
    type: 'params',
    urlparams: {
      param: 'id',
    }
  }, // http://api.zhuishushenqi.com/book/56d0b60dfb51235c3a7a2739/recommend
  // 作者名下的书籍
  authorBooks: {
    url: 'http://api.zhuishushenqi.com/book/accurate-search',
    type: 'query'
  }, // query ?author=忘语
  // 书籍章节内容
  bookChapters: {
    url: 'http://api.zhuishushenqi.com/toc/:param?view=chapters',
    type: 'params',
    urlparams: {
      param: 'id',
    }
  },
  // 书源
  bookSources: {
    url: 'http://api.zhuishushenqi.com/atoc',
    type: 'query'
  }, // query ?view=summary&book=5779b38d3b433dd647d95da2
  // 章节内容:id 单章id
  chapterContent: {
    url: 'http://chapter2.zhuishushenqi.com/chapter/:param',
    type: 'params',
    urlparams: {
      param: '章节地址:http://vip.zhuishushenqi.com/chapter/5881e82e4e307ea47f89df43',
    }
  }, //id: chapter id
  // 书籍搜索 可以搜索作者但是不精确
  bookSearch: {
    url: 'http://api.zhuishushenqi.com/book/fuzzy-search',
    type: 'query'
  }, //query ?query=凡人修仙传
  // 排名分类
  rankCategory: {
    url: 'http://api.zhuishushenqi.com/ranking/gender',
    type: 'query'
  },
  // 排名详情
  rankInfo: {
    url: 'http://api.zhuishushenqi.com/ranking/:param',
    type: 'params',
    urlparams: {
      param: '排名id' //周榜等
    }
  }, // id: rank id
  // 讨论
  discussions: {
    url: 'http://api.zhuishushenqi.com/post/by-book',
    type: 'query',
    querystrings: {
      book: 'bookid',
      sort: '(updated | created | comment - count)', // 排序方式
      type: '(normal, vote)', // 未知
      start: 0,
      limit: 20
    }
  },
  // 短评
  shortReviews: {
    url: 'http://api.zhuishushenqi.com/post/short-review',
    type: 'query',
    querystrings: {
      book: 'bookId',
      sortType: '(lastUpdated | newest | mostlike)', //排序方式
      start: 0,
      limit: 20
    }
  },
  //长评
  bookReviews: {
    url: 'http://api.zhuishushenqi.com/post/review/by-book',
    type: 'query',
    querystrings: {
      book:'bookId',
      sort: '(updated | created | comment - count)',
      start: 0,
      limit: 20
    }
  },
  lists: {
    url: 'http://api.zhuishushenqi.com/book-list',
    type: 'query',
    querystring: {
      sort: '(collectorCount | created)',
      duration: '本周最热：duration=last-seven-days&sort=collectorCount,最新发布：duration=all&sort=created,最多收藏：duration=all&sort=collectorCount',
      gender: '(male | female)',
      tag: '都市、古代、架空、重生、玄幻、网游',
      start:0
    }
  },
  detail: {
    url: 'http://api.zhuishushenqi.com/book-list/:param',
    type: 'params',
    urlparams: {
      param: 'id'
    }
  }, // bookId
};

router.get('/', function(req, res, next) {
  res.send(util.inspect(req));
});

router.get('/api/:name', function(req, res, next) {
  const name = req.params.name;
  if (Object.keys(api).indexOf(name) < 0) {
    res.send('err');
  } else {
    var apiInfo = api[name];
    if(apiInfo.type === 'query') {
      superagent.get(apiInfo.url).query(req.query).end((error, respond) => {
        res.send(JSON.parse(respond.text));
      });
    } else {
      const url = apiInfo.url.replace(':param',req.query['param']);
      superagent.get(url).end((error, respond) => {
        res.send(JSON.parse(respond.text));
      });
    }

  }
});

router.get('/getip', function(req, res, next) {
  var ip = (req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress).split(",")[0];
  res.send(ip);
});

// 获取带书籍数量的父级分类（包含子类）
router.get('/category', function(req, res, next) {
  //   res.send(api.category.categoryWithSubCategories);
  superagent.get(api.category.categoryWithSubCategories).end((error, respond) => {
    res.send(JSON.parse(respond.text));
  });
});

module.exports = router;
