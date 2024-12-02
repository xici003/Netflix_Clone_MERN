import User from "../models/userModel.js";
import { fetchFromTMDB } from "../services/tmdbServices.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const searchPerson = catchAsync(async (req, res, next) => {
  const { query } = req.params;
  const response = await fetchFromTMDB(
    `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
  );

  if (response.results.length == 0) {
    return next(new AppError("Can't find this person"));
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].profile_path,
        title: response.results[0].name,
        searchType: "person",
        createAt: Date.now(),
      },
    },
  });

  res.status(200).json({
    status: "success",
    content: response.results,
  });
});

const searchMovie = catchAsync(async (req, res, next) => {
  const { query } = req.params;
  const response = await fetchFromTMDB(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );

  if (response.results.length == 0) {
    return next(new AppError("Can't find this person"));
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].profile_path,
        title: response.results[0].title,
        searchType: "movie",
        createAt: Date.now(),
      },
    },
  });

  res.status(200).json({
    status: "success",
    content: response.results,
  });
});

const searchTV = catchAsync(async (req, res, next) => {
  const { query } = req.params;
  const response = await fetchFromTMDB(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
  );

  if (response.results.length == 0) {
    return next(new AppError("Can't find this person"));
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].profile_path,
        title: response.results[0].name,
        searchType: "tv",
        createAt: Date.now(),
      },
    },
  });

  res.status(200).json({
    status: "success",
    content: response.results,
  });
});

const getSearchHistory = (req, res) => {
  res.status(200).json({
    status: "success",
    content: req.user.searchHistory,
  });
};

const removeItemFromHistory = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id, 10); // Parse directly while destructuring

  // Ensure that 'id' is a valid number
  if (isNaN(id)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID format",
    });
  }

  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      searchHistory: { id: id },
    },
  });

  res.status(200).json({
    status: "success",
    message: "Item remove successfully",
  });
});

export default {
  searchPerson,
  searchMovie,
  searchTV,
  getSearchHistory,
  removeItemFromHistory,
};
