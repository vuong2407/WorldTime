const newsModel = require("../models/newsModel");

module.exports = {
  create: async (req, res, next) => {
    const newsUpdate = req.news;
    if (newsUpdate.approve) {
      try {
        const news = new newsModel({ newsSubscribed: newsUpdate });
        await news.save();
        res.locals.redirectView = `/admin/news/need-approve`;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      res.locals.redirectView = `/admin/news/need-approve`;
      next();
    }
  },
  findAll: async (req, res, next) => {
    try {
      req.allNews = await newsModel.find().populate("newsSubscribed");
      next();
    } catch (error) {
      console.log(`error findAll news: ${error.message}`);
      next(error);
    }
  },
  findById: async (req, res, next) => {
    try {
      const news = await newsModel
        .findById(req.params.id)
        .populate("newsSubscribed");
      res.locals.news = news;
      next();
    } catch (error) {
      console.log(`error findById news: ${error.message}`);
      next(error);
    }
  },
  pagination: async (req, res, next) => {
    try {
      const perPage = 3;
      const page = res.locals.page;
      const totalNews = req.allNews.length;
      const lastNews = req.allNews.filter((news, index) => index < 3);
      let listNews = [];
      for (let i = (page - 1) * perPage; i < perPage * page; i++) {
        if (i == totalNews) break;
        listNews.push(req.allNews[i]);
      }
      res.locals.totalPage =
        totalNews % perPage == 0
          ? totalNews / perPage
          : Math.floor(totalNews / perPage) + 1;
      res.locals.lastNews = lastNews;
      res.locals.listNews = listNews.reverse();
      next();
    } catch (error) {
      console.log(`Error paginate: ${error.message}`);
    }
  },
};
