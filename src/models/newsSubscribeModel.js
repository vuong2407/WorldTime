const mongoose = require("mongoose");

const newsSubscribe = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sdescription: {
      type: String,
      required: true,
    },
    approve: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    note: {
      type: String,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NewsSubscribe", newsSubscribe);
