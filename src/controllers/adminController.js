module.exports = {
  redirectView: (req, res) => {
    res.redirect(res.locals.redirectView);
  },
  detailPage: (req, res) => {
    res.render("admin/profile");
  },
  needApprovePage: (req, res) => {
    res.render("admin/newsNeedApprove");
  },
};
