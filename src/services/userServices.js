const passport = require("passport");
const userModel = require("../models/usersModel");

module.exports = {
  findById: async (req, res, next) => {
    try {
      const userId = req.params.id ? req.params.id : res.locals.currentUser._id;
      res.locals.user = await userModel.findById({
        _id: userId,
      });
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  },
  findByIdAndUpdate: async (req, res, next) => {
    const userParams = { ...req.body };
    try {
      const user = await userModel.findByIdAndUpdate(
        res.locals.currentUser._id,
        {
          $set: userParams,
        }
      );
      console.log(`user: ${user.username} updated successfully`);
      res.locals.redirectView = "/user/profile";
      next();
    } catch (error) {
      console.log(`error update user: ${error.message}`);
      next(error);
    }
  },
  create: (req, res, next) => {
    if (req.body.password != req.body.confirmPassword) {
      req.flash("error", "confirm password is no same");
      console.log("confirm password is no same");
      res.locals.redirectView = "/user/sign-up";
      next();
    } else {
      const userParams = { username: req.body.username, email: req.body.email };
      console.log(userParams);
      userModel.register(userParams, req.body.password, (error, user) => {
        console.log(user);
        if (user) {
          req.flash("success", `username: ${req.body.username} is created`);
          res.locals.redirectView = "/user/login";
          next();
        } else {
          req.flash(
            "error",
            `Failed to create account because: ${error.message}`
          );
          console.log(error.message);
          res.locals.redirectView = "/user/sign-up";
          next();
        }
      });
    }
  },
  authentiacate: passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!",
  }),
  isAuthenticated: (req, res, next) => {
    if (res.locals.loggedIn) next();
    else res.redirect("/user/login");
  },
  adminAuthorization: (req, res, next) => {
    const user = res.locals.currentUser;
    if (user.role == "admin") {
      next();
    } else {
      req.flash("noPermision", "You no have permision in this site");
      res.redirect("/error/no-permission");
    }
  },
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "loggout successfully");
    res.locals.redirectView = "/";
    next();
  },
};
