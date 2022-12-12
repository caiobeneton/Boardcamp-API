import { Router } from "express"
import { getCustomer, postCustomer } from "../controllers/customers.controller.js"
import { customerValidation } from "../middleware/customerValidation.middleware.js"

const router = Router()

router.post("/customers", customerValidation, postCustomer)
router.get("/customers", getCustomer)

export default router