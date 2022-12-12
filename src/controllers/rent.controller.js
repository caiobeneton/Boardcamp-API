import connection from "../database/database.js"
import dayjs from "dayjs"

export async function getRentals(req, res) { }

export async function postRental(req, res) {
    const rent = req.body
    const rentDate = dayjs().format("YYYY-MM-DD")
    const returnDate = null
    const delayFee = null
    const game = res.locals.game
    const pricePerDay = game.pricePerDay
    const originalPrice = pricePerDay * rentDate.daysRented

    try {
        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`, [rent.customerId, rent.gameId, rentDate,rent.daysRented, returnDate, originalPrice, delayFee])

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500)
    }

}