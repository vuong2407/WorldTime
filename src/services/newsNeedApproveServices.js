const newsSubscribeModel = require("../models/newsSubscribeModel");

module.exports = {
  findAll: async (req, res, next) => {
    const newsSubscribe = await newsSubscribeModel.find({
      approve: false,
    });
    res.locals.newsSubscribe = newsSubscribe;
    next();
  },
  filterByUserAndApprove: async (req, res, next) => {
    try {
      res.locals.listUpdateNews = await newsSubscribeModel.find({
        user: res.locals.currentUser._id,
        approve: false,
      });
      next();
    } catch (error) {
      console.log(`error filter newsNeedApprove: ${error.message}`);
      next(error);
    }
  },
  findById: async (req, res, next) => {
    try {
      res.locals.newsNotApprove = await newsSubscribeModel.findById({
        _id: req.params.id,
      });
      next();
    } catch (error) {
      console.log("error when findById newsNotApprove");
      next(error);
    }
  },
  create: async (req, res, next) => {
    let newsCreate = req.newsCreate;

    try {
      newsCreate = await newsCreate.save();
      console.log(newsCreate);
      res.locals.redirectView = "/";
      next();
    } catch (error) {
      console.log(error.message);
    }
  },
  findByIdAndUpdate: async (req, res, next) => {
    const newsUpdate = req.newsUpdate;
    try {
      const news = await newsSubscribeModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: newsUpdate,
        },
        {
          returnDocument: "after",
        }
      );
      req.news = news;
      res.locals.redirectView = "/user/update-news";
      next();
    } catch (error) {
      console.log(`Error when approve news: ${error.message}`);
      next(error);
    }
  },
};
