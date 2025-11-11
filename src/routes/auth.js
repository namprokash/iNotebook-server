const express = require("express");
const userModel = require("../models/UserSchema");
const userRouter = express.Router();

let obj = {
  name: "Saif",
  stu: "MERN Stack",
};

userRouter.get("/user", (req, res) => {
  res.json(obj);
});

userRouter.post("/user", (req, res) => {
  // res.json(req.body);
  const user = userModel(req.body);
  const saveuser = user.save();
  res.send("user has been saved successfully!");
});

module.exports = userRouter;
