import { customerSchema } from "../models/customer.model.js";
import connection from "../database/database.js";

export async function customerValidation(req, res, next) {
    const customer = req.body

    const { error } = customerSchema.validate( customer, {abortEarly: false})

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors)
    }

    try {
        const checkCPF = await connection.query(
            `SELECT * FROM customers WHERE cpf = $1`,
            [cpf]
        )

        if (checkCPF.rows.length > 0) {
            return res.status(409).send({message: "CPF already exists"})
        }

    } catch (error) {
        res.sendStatus(500)
    }

    next()
}