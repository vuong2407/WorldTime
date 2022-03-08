module.exports = {
  indexView: (req, res) => {
    res.render("home/index");
  },
  redirectView: (req, res) => {
    res.redirect(res.locals.redirectView);
  },
  detailPage: (req, res) => {
    res.render("home/detailNews");
  },
  pageContent: (req, res, next) => {
    res.locals.page = req.query.page || 1;
    next();
  },
};
