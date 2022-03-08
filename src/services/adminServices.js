const userModel = require("../models/usersModel");

module.exports = {
  findById: async (req, res, next) => {
    try {
      const adminId = req.params.id
        ? req.params.id
        : res.locals.currentUser._id;
      res.locals.admin = await userModel.findById({ _id: adminId });
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  },
};
