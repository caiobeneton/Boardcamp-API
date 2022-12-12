import { Router } from "express";
import { deleteRental, getRentals, postRental, returnRental } from "../controllers/rent.controller.js";
import { deleteRentalValidation } from "../middleware/deleteRentalValidation.middleware.js";
import { rentValidation } from "../middleware/rentValidation.middleware.js";
import { returnValidation } from "../middleware/returnValidation.middleware.js";

const router = Router();

router.post("/rentals", rentValidation, postRental)
router.get("/rentals", getRentals)
router.delete("/rentals/:id", deleteRentalValidation, deleteRental)
router.post("/rentals/:id/return", returnValidation, returnRental) 

export default router