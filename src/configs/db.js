const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://NguyenVuong:vuongnguyen04040707@cluster0.geebv.mongodb.net/VnNews",
      {
        useNewUrlParser: true,
      }
    );
    console.log("connect succesfull");
  } catch (error) {
    console.log("connect failure");
  }
}

module.exports = { connection };
