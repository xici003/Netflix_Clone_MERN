import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...S");
  //Turn off application
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

// 4. Start Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  //Turn off application
  server.close(() => {
    process.exit(1);
  });
});
