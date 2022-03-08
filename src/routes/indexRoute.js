const homeRoute = require("./homeRoute");
const userRoute = require("./usersRoute");
const adminRoute = require("./adminRoute");
const errorRoute = require("./errorRoute");

module.exports = function (app) {
  app.use("/", homeRoute);
  app.use("/user", userRoute);
  app.use("/admin", adminRoute);
  app.use("/error", errorRoute);
};
