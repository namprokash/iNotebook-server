const express = require("express");
const userModel = require("../models/UserSchema");
const { body, validationResult } = require("express-validator");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = "thisisasecretkey";

userRouter.get("/user", (req, res) => {
  res.json(obj);
});

// user validation

userRouter.post(
  "/user",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required!")
      .isLength({ min: 3 })
      .withMessage("Name must min 3 characters"),
    body("email")
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Enter a valid Email!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be min 6 required!"),
  ],
  async (req, res) => {
    // res.json(req.body);
    try {
      // Checking validations ===============
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map((v) => v.msg));
      }

      const { name, email, password } = req.body;

      // check user exist or not ============

      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return res.status(400).send("User already exist with this email!");
      }

      // hashing and salting password

      const hashPw = await bcrypt.hash(password, 15);

      // Create a new user ===========
      const user = await userModel.create({ name, email, password: hashPw });
      console.log(user._id);

      const authToken = jwt.sign({ user }, jwtSecretKey);
      res.send({ authToken });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
);

userRouter.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Enter vlaid credential!")
      .isEmail()
      .withMessage("Enter vlaid credential!"),
    body("password").notEmpty().withMessage("Enter vlaid credential!"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map((v) => v.msg));
      }
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "You have entered invalid credentials!" });
      }

      const userAuth = await bcrypt.compare(password, user.password);
      if (!userAuth) {
        return res.status(400).send("Invalid credentials!");
      }

      const auth = jwt.sign(user.id, jwtSecretKey);
      console.log(auth);
      const decoded = jwt.decode(auth, jwtSecretKey);
      console.log(decoded);
      res.status(200).json({
        payload: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = userRouter;
