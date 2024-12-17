import jwt from "jsonwebtoken";
import { promisify } from "util";

import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined; // Remove password from output

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

const signup = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError("This email is already in use.", 400));
  }

  const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
  const photo = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

  try {
    req.body.photo = photo;
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  createSendToken(user, 200, res);
});

const logout = catchAsync((req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "Logout successfully",
  });
});

const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return next(new AppError("You are not login to get access", 401));
  }

  //2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("The token does no longer exists"));
  }

  req.user = freshUser;
  next();
});

const authCheck = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      user: req.user,
    });
  } catch (err) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default { signup, signIn, logout, protect, authCheck };
