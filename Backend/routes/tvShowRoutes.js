import express from "express";
import tvShowController from "../controllers/tvShowController.js";

const router = express.Router();

router.get("/trending", tvShowController.getTrendingTvShow);

router.get("/:id/trailers", tvShowController.getTvShowTrailers);
router.get("/:id/details", tvShowController.getTvShowDetails);
router.get("/:id/similar", tvShowController.getSimilarTvShow);
router.get("/:category", tvShowController.getTvShowByCategory);

export default router;
