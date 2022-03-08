const mongoose = require("mongoose");

const newsModel = new mongoose.Schema(
  {
    newsSubscribed: {
      type: mongoose.Types.ObjectId,
      ref: "NewsSubscribe",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsModel);
