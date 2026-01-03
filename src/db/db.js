const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://msia:Saif7799568@cluster0.nss7iq3.mongodb.net/iNotebook";

const connectMongo = async () => {
  await mongoose.connect(mongoUrl);
  console.log("DB Connected successfully!");
};

module.exports = connectMongo;
