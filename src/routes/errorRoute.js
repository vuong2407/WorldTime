const route = require("express").Router();
const errorController = require("../controllers/errorController");

route.get("/no-permission", errorController.indexNoPermission);

module.exports = route;
