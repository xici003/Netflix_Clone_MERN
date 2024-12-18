import { fetchFromTMDB } from "../services/tmdbServices.js";
import catchAsync from "../utils/catchAsync.js";

const getTrendingTvShow = catchAsync(async (req, res, next) => {
  const data = await fetchFromTMDB(
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
  );
  const randomTv =
    data.results[Math.floor(Math.random() * data.results?.length)];

  res.status(200).json({
    status: "success",
    content: randomTv,
  });
});

const getTvShowTrailers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const trailers = await fetchFromTMDB(
    `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
  );

  res.status(201).json({
    status: "success",
    trailers: trailers.results,
  });
});

const getTvShowDetails = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`
  );

  res.status(201).json({
    status: "success",
    details: data,
  });
});

const getSimilarTvShow = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
  );

  res.status(201).json({
    status: "success",
    content: data.results,
  });
});

const getTvShowByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
  );

  res.status(201).json({
    status: "success",
    content: data.results,
  });
});

export default {
  getTrendingTvShow,
  getTvShowDetails,
  getTvShowTrailers,
  getTvShowByCategory,
  getSimilarTvShow,
};
