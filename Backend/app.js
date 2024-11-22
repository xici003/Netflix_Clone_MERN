const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const globalErrorHandle = require("./controllers/errorController");

const app = express();

//Developing logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // Will allow us to parse req.body

app.use((req, res, next) => {
  console.log("Hello from app.js");
  next();
});

//3. Route Handle
app.use("/api/v1/users", userRouter);

//MIDDLEWARE handle error wrong route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandle);
module.exports = app;
