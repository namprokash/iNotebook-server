const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017/iNoteBook";

const connectMongo = async () => {
  await mongoose.connect(mongoUrl);
  console.log("DB Connected successfully!");
};

module.exports = connectMongo;
