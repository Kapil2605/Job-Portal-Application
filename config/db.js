const mongoose = require("mongoose");
const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Mongodb Database Successfully`.bgMagenta.white);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
