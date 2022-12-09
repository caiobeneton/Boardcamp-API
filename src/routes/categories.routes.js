import {Router} from "express"
import { getCategories, postCategories } from "../controllers/category.controller.js"
import { categoryValidator } from "../middleware/categoryValidation.middleware.js"

const router = Router()

router.get("/categories", getCategories)
router.post("/categories", categoryValidator, postCategories)

export default router