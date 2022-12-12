import connection from "../database/database.js"

export async function deleteRentalValidation(req, res, next) {
    const {id} = req.params

    try {
        const checkRentalId = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);

        if (checkRentalId.rows.length === 0) {
            return res.status(400).send({
                message: "Rental not found"
            })
        }

        if (!checkRentalId.rows[0].returnDate) {
            return res.status(400).send({
                message: "Rental not finished"
            })
        }

    } catch (error) {
        res.sendStatus(500)
    }

    next()
}