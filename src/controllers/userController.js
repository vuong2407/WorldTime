module.exports = {
  redirectView: (req, res) => {
    const redirectView = res.locals.redirectView;
    res.redirect(redirectView);
  },
  createPage: (req, res) => {
    res.render("user/createNews");
  },
  loginPage: (req, res) => {
    res.render("login");
  },
  detailPage: (req, res) => {
    res.render("user/profile");
  },
  detailNewsNeedApprovePage: (req, res) => {
    res.render("user/updateNews");
  },
  signUpPage: (req, res) => {
    res.render("signUp");
  },
  updatePage: (req, res) => {
    res.render("user/listUpdateNews");
  },
};
