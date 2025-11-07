const express = require("express");
const router = express.Router();

let obj = {
  name: "Saif",
  stu: "MERN Stack",
};

router.get("/user", (req, res) => {
  res.json(obj);
});

module.exports = router;
