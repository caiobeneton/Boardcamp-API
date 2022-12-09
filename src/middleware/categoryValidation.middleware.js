import connection from "../database/database.js"
import { categorySchema } from "../models/category.model.js"

export async function categoryValidator(req, res, next) {
    const name = req.body

    const { error } = categorySchema.validate(name, {abortEarly: false})

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    try {
        const repeated = await connection.query("SELECT * FROM categories WHERE name = $1", [name])

        if (repeated) {
            return res.status(409).send({message: "Category already exists"})
        }

    } catch (error) {
        return res.sendStatus(500)
    }

    next()
}