import { fetchFromTMDB } from "../services/tmdbServices.js";
import catchAsync from "../utils/catchAsync.js";

const getTrendingMovie = catchAsync(async (req, res, next) => {
  const data = await fetchFromTMDB(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
  );
  const randomMovies =
    data.results[Math.floor(Math.random() * data.results?.length)];

  res.status(200).json({
    status: "success",
    content: randomMovies,
  });
});

const getMovieTrailers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const trailers = await fetchFromTMDB(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
  );

  res.status(201).json({
    status: "success",
    trailers: trailers.results,
  });
});

const getMovieDetails = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  );

  res.status(201).json({
    status: "success",
    details: data,
  });
});

const getSimilarMovies = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
  );

  res.status(201).json({
    status: "success",
    movies: data.results,
  });
});

const getMoviesByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
  );

  res.status(201).json({
    status: "success",
    content: data.results,
  });
});

export default {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
};
