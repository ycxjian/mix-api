var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var api = {
  category: {
    // 带书籍数量的父分类
    categoryWithBookCount: 'http://api.zhuishushenqi.com/cats/lv2/statistics',
    // 带子分类的父分类
    categoryWithSubCategories: 'http://api.zhuishushenqi.com/cats/lv2',
    // 分类详情: 带着书籍
    categoryInfo: 'http://api.zhuishushenqi.com/book/by-categories'
  },
  book: {
    // 书籍详情
    bookInfo: 'http://api.zhuishushenqi.com/book', // id 书籍id
    // 相关推荐
    relatedRecommendedBooks: 'http://api.zhuishushenqi.com/book', // http://api.zhuishushenqi.com/book/56d0b60dfb51235c3a7a2739/recommend
    // 作者名下的书籍
    authorBooks: 'http://api.zhuishushenqi.com/book/accurate-search', // query ?author=忘语
    // 书籍章节内容
    bookChapters: 'http://api.zhuishushenqi.com/atoc',
    // 书源
    bookSources: 'http://api.zhuishushenqi.com/atoc', // query ?view=summary&book=5779b38d3b433dd647d95da2
    // 章节内容:id 单章id
    chapterContent: 'http://chapter2.zhuishushenqi.com/chapter', //id: chapter id
    // 书籍搜索 可以搜索作者但是不精确
    bookSearch: 'http://api.zhuishushenqi.com/book/fuzzy-search' //query ?query=凡人修仙传
  },
  rank: {
    // 排名分类
    rankCategory: 'http://api.zhuishushenqi.com/ranking/gender',
    // 排名详情
    rankInfo: 'http://api.zhuishushenqi.com/ranking' // id: rank id
  },
  comment: {
    // 讨论
    discussions: 'http://api.zhuishushenqi.com/post/by-book',
    // 短评
    shortReviews: 'http://api.zhuishushenqi.com/post/short-review',
    //长评
    bookReviews: 'http://api.zhuishushenqi.com/post/review/by-book'
  },
  bookList: {
    lists: 'http://api.zhuishushenqi.com/book-list',
    detail: 'http://api.zhuishushenqi.com/book-list' // bookId
  },
};

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
//   res.send(api.category.categoryWithSubCategories);
  superagent.get(category.categoryWithSubCategories).end((request,respond)=>{
    res.send(respond);
  }).catch((err)=>{
    res.send(err);
  });
});

module.exports = router;
