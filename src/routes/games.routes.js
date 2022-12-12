import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controller.js";
import { gameValidation } from "../middleware/gameValidation.middleware.js";

const router = Router();

router.get("/games", getGames)
router.post("/games", gameValidation, postGame)

export default router