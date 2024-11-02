
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {

  try {
    await mongoose.connect("mongodb+srv://Jawad404:Jawad818@thecluster.oqovsqq.mongodb.net/?retryWrites=true&w=majority&appName=TheCluster", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
