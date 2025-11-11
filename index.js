const express = require("express");
const app = express();
const port = 3000;
const connectMongo = require("./src/db/db");
const router = require("./src/routes/notes");
const userRouter = require("./src/routes/auth");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello server!");
});

app.use("/api", userRouter);
app.listen(port, () => {
  console.log(`app is running successfully! http://localhost:${port}`);
  connectMongo();
});
