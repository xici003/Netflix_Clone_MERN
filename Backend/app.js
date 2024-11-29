import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import tvShowRouter from "./routes/tvShowRoutes.js";
import searchRouter from "./routes/searchRoutes.js";

import authController from "./controllers/authController.js";
import globalErrorHandle from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

//Developing logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // Will allow us to parse req.body
app.use(cookieParser()); // Will allow us to parse req.cookies

app.use((req, res, next) => {
  console.log("Hello from app.js");
  next();
});

//3. Route Handle
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/tv", tvShowRouter);
app.use("/api/v1/search", authController.protect, searchRouter);

//MIDDLEWARE handle error wrong route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandle);
export default app;
