const express = require("express");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from app.js");
  next();
});

//3. Route Handle
app.use("/api/v1/users", userRouter);

module.exports = app;
