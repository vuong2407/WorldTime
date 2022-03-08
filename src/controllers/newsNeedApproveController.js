const newsSubscribeModel = require("../models/newsSubscribeModel");

module.exports = {
  redirectView: (req, res) => {
    res.redirect(res.locals.redirectView);
  },
  detailPage: (req, res) => {
    res.render("newsNotApprove/index");
  },
  arpproveUpdate: (req, res, next) => {
    const approveState = req.query.state == "legal" ? true : false;
    req.newsUpdate = {
      admin: res.locals.currentUser,
      note: req.body.note,
      approve: approveState,
    };
    next();
  },
  contentUpdate: (req, res, next) => {
    let newsUpdate = null;
    if (req.filename) {
      newsUpdate = { ...req.body, image: req.file.filename, approve: false };
    } else {
      newsUpdate = {
        title: req.body.title,
        author: req.body.author,
        sdescription: req.body.sdescription,
        description: req.body.description,
        approve: false,
      };
    }
    req.newsUpdate = newsUpdate;
    next();
  },
  contentCreate: (req, res, next) => {
    const newsCreate = new newsSubscribeModel({
      ...req.body,
      user: res.locals.currentUser,
      image: req.file.filename,
      approve: false,
    });
    req.newsCreate = newsCreate;
    next();
  },
};
