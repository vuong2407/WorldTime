const route = require("express").Router();
const adminController = require("../controllers/adminController");
const adminServices = require("../services/adminServices");
const userServices = require("../services/userServices");
const newsNeedApproveServices = require("../services/newsNeedApproveServices");
const newsNeedApproveController = require("../controllers/newsNeedApproveController");
const newsServices = require("../services/newsServices");

route.use(userServices.isAuthenticated, userServices.adminAuthorization);

route.get("/profile", adminServices.findById, adminController.detailPage);
route.put(
  "/profile/update",
  userServices.findByIdAndUpdate,
  adminController.redirectView
);
route.get(
  "/news/need-approve",
  newsNeedApproveServices.findAll,
  adminController.needApprovePage
);
route.get(
  "/news/need-approve/:id",
  newsNeedApproveServices.findById,
  newsNeedApproveController.detailPage
);
route.put(
  "/news/need-approve/:id/update",
  newsNeedApproveController.arpproveUpdate,
  newsNeedApproveServices.findByIdAndUpdate,
  newsServices.create,
  newsNeedApproveController.redirectView
);

module.exports = route;
