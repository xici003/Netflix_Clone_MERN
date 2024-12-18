import express from "express";
import searchController from "../controllers/searchController.js";

const router = express.Router();

router.get("/person/:query", searchController.searchPerson);
router.get("/movies/:query", searchController.searchMovie);
router.get("/tv/:query", searchController.searchTV);

router.get("/history", searchController.getSearchHistory);
router.delete("/history/:id", searchController.removeItemFromHistory);

export default router;
