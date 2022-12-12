import { gameSchema } from "../models/game.model.js";
import connection from "../database/database.js";

export async function gameValidation(req, res, next) {
    const game = req.body

    const {error} = gameSchema.validate(game, {abortEarly: false})

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    try {
        const categoryExists = await connection.query("SELECT * FROM categories WHERE id = $1;", [game.categoryId])

        if (!categoryExists) {
            return res.status(400).send({message: "Category does not exist"})
        }

        const checkName = await connection.query("SELECT * FROM games WHERE name = $1;", [game.name])

        if (checkName.rows.length > 0) {
            return res.status(409).send({message: "Game name already exists"})
        }
    } catch (error) {
        return res.sendStatus(500)
    }

    next()
}