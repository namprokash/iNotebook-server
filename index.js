const express = require("express");
const app = express();
const port = 3000;
const connectMongo = require("./src/db/db");
const router = require("./src/routes/notes");

app.get("/", (req, res) => {
  res.send("Hello server!");
});

app.use("/api", router);
app.listen(port, () => {
  console.log(`app is running successfully! http://localhost:${port}`);
  connectMongo();
});
