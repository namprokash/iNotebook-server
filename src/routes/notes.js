const express = require("express");
const router = express.Router();

let obj = {
  name: "Saif",
  stu: "MERN Stack",
};

router.get("/notes", (req, res) => {
  res.json(obj);
});

module.exports = router;
