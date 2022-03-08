const route = require("express").Router();
const usersController = require("../controllers/userController");
const multer = require("multer");
const userServices = require("../services/userServices");
const newsNeedApproveServices = require("../services/newsNeedApproveServices");
const userController = require("../controllers/userController");
const newsNeedApproveController = require("../controllers/newsNeedApproveController");
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./src/public/uploads/imageNews");
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

route.get("/login", usersController.loginPage);
route.get("/sign-up", usersController.signUpPage);
route.post("/login", userServices.authentiacate);
route.post("/sign-up", userServices.create, usersController.redirectView);
route.use(userServices.isAuthenticated);
route.get("/profile", userServices.findById, usersController.detailPage);
route.put(
  "/profile/update",
  userServices.findByIdAndUpdate,
  userController.redirectView
);
route.get("/logout", userServices.logout, userController.redirectView);
route.get("/create-news", usersController.createPage);
route.post(
  "/create-news",
  upload.single("image"),
  newsNeedApproveController.contentCreate,
  newsNeedApproveServices.create,
  usersController.redirectView
);
route.get(
  "/update-news",
  newsNeedApproveServices.filterByUserAndApprove,
  userController.updatePage
);
route.get(
  "/update-news/:id",
  newsNeedApproveServices.findById,
  userController.detailNewsNeedApprovePage
);
route.put(
  "/update-news/:id",
  newsNeedApproveController.contentUpdate,
  newsNeedApproveServices.findByIdAndUpdate,
  userController.redirectView
);

module.exports = route;
