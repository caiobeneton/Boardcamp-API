import connection from "../database/database.js"

export async function returnValidation(req, res, next) {
    const {id} = req.params

    try {
        const rent = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id])

        if (!rent.rows) {
            return res.status(404)
        }

        const returnDate = rent.rows[0].returnDate

        if (returnDate) {
            return res.status(400).send({ message: "Rent already finished" })
        }

        res.locals.rent = rent.rows[0]
    } catch (error) {
        res.sendStatus(500)
    }

    next()
}