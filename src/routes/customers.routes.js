import { Router } from "express"
import { getCustomer, getCustomerById, postCustomer, putCustomer } from "../controllers/customers.controller.js"
import { customerValidation } from "../middleware/customerValidation.middleware.js"

const router = Router()

router.post("/customers", customerValidation, postCustomer)
router.get("/customers", getCustomer)
router.get("/customers/:id", getCustomerById)
router.put("/customers/:id", customerValidation, putCustomer)

export default router