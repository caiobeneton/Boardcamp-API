import { rentalSchema } from "../models/rent.model.js";
import connection from "../database/database.js";

export async function rentValidation(req, res, next) {
    const rent = req.body

    const { error } = rentalSchema.validate(rent, { abortEarly: false });
    
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        
        return res.status(400).send(errors);
    }

    try {
        const customerExists = await connection.qwery(`SELECT * FROM customers WHERE id=$1;`, [rent.customerId])

        if (customerExists.rows.length === 0) {
            return res.status(400)
        }

        const gameExists = await connection.qwery(`SELECT * FROM games WHERE id=$1;`, [rent.gameId])

        if (gameExists.rows.length === 0) {
            return res.status(400)
        }

        const game = gameExists.rows[0]
        res.locals.game = game
        
        const checkRents = await connection.qwery(`SELECT * FROM rentals WHERE "gameId"=$1;`, [rent.gameId])

        const rented = checkRents.rowCount
        if (game.stockTotal <= rented) {
           return res.sendStatus(400)
        }
    } catch (error) {
        res.sendStatus(500)
    }

    next()
}