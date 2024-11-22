const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username can't be blank"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "Username can't be blank"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  photo: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: Array,
    default: [],
  },
});

//Encrypt password
userSchema.pre("save", async function (next) {
  //This func only run if password is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;