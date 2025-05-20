const mongoose = require("mongoose");

// refering to the cluster
const connectDB = async () => {
  // this returns a Promise
  await mongoose.connect(
    "mongodb+srv://ForNodeJS:Yousuf%402006@fornode.8jzcabq.mongodb.net/TinDev"
  );
};

module.exports = connectDB;
