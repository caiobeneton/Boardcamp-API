import { Router } from "express";
import { getRentals, postRental } from "../controllers/rent.controller.js";
import { rentValidation } from "../middleware/rentValidation.middleware.js";

const router = Router();

router.post("/rentals", rentValidation, postRental)
router.get("/rentals", getRentals)

export default router