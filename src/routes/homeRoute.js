const route = require("express").Router();
const homeController = require("../controllers/homeController");
const newsServices = require("../services/newsServices");

route.get(
  "/",
  homeController.pageContent,
  newsServices.findAll,
  newsServices.pagination,
  homeController.indexView
);
route.get("/news/:id", newsServices.findById, homeController.detailPage);

module.exports = route;
