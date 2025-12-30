const express = require("express");
var cors = require("cors");
const app = express();
const port = 5000;
const connectMongo = require("./src/db/db");
const router = require("./src/routes/notes");
const userRouter = require("./src/routes/auth");
const cookieParser = require("cookie-parser");
const noteRouter = require("./src/routes/notes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello server!");
});

app.use("/api", userRouter);
app.use("/api", noteRouter);
app.listen(port, () => {
  console.log(`app is running successfully! http://localhost:${port}`);
  connectMongo();
});
