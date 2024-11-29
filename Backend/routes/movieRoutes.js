import express from "express";
import movieController from "../controllers/movieController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.get("/trending", movieController.getTrendingMovie);

router.get(
  "/:id/trailers",
  authController.protect,
  movieController.getMovieTrailers
);
router.get(
  "/:id/details",
  authController.protect,
  movieController.getMovieDetails
);
router.get("/:id/similar", movieController.getSimilarMovies);
router.get("/:category", movieController.getMoviesByCategory);

export default router;
