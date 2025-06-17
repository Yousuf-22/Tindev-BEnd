const mongoose = require("mongoose");

// refering to the cluster
const connectDB = async () => {
  // this returns a Promise
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
  
};

module.exports = connectDB;
