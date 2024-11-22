const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/appError");

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true, // cannot be accesses or modified in any way by the browser
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  //Remove pass from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError(400, "This email is already in used."));
  }

  const PROFILE_PICS = [
    "../public/img/avatar1.png",
    "../public/img/avatar2.png",
    "../public/img/avatar3.png",
  ];
  const photo = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

  try {
    // Create a new user
    req.body.photo = photo;
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};
