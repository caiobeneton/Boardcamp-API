import connection from "../database/database.js"
import dayjs from "dayjs"

export async function getRentals(req, res) {
    const { gameId, customerId } = req.query;

    try {
        if (!gameId && !customerId) {
            const rent = await connection.query(`
                SELECT rentals.*, JSON_BUILD_OBJECT('id',customers.id, 
                'name', customers.name) AS customer,
                JSON_BUILD_OBJECT('id',games.id,
                'name', games.name,
                'categoryId', games."categoryId",
                'categoryName', categories.name) AS game FROM 
                rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId"
                JOIN categories ON categories.id = games."categoryId";
            `)

            return res.send(rent.rows)
        } else if (gameId && !customerId) {
            const rent = await connection.query(`
                SELECT rentals.*, JSON_BUILD_OBJECT('id',customers.id, 
                'name', customers.name) AS customer,
                JSON_BUILD_OBJECT('id',games.id,
                'name', games.name,
                'categoryId', games."categoryId",
                'categoryName', categories.name) AS game FROM 
                rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId"
                JOIN categories ON categories.id = games."categoryId" WHERE "gameId" = $1;
            `, [gameId])
            return res.send(rent.rows)
        } else if (!gameId && customerId) {
            const rent = await connection.query(`
                SELECT rentals.*, JSON_BUILD_OBJECT('id',customers.id, 
                'name', customers.name) AS customer,
                JSON_BUILD_OBJECT('id',games.id,
                'name', games.name,
                'categoryId', games."categoryId",
                'categoryName', categories.name) AS game FROM 
                rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId"
                JOIN categories ON categories.id = games."categoryId" WHERE "customerId" = $1;
            `, [customerId])
            return res.send(rent.rows)
        } else if (gameId && customerId) {
            const rent = await connection.query(`
                SELECT rentals.*, JSON_BUILD_OBJECT('id',customers.id, 
                'name', customers.name) AS customer,
                JSON_BUILD_OBJECT('id',games.id,
                'name', games.name,
                'categoryId', games."categoryId",
                'categoryName', categories.name) AS game FROM 
                rentals JOIN customers ON customers.id = "customerId" JOIN games ON games.id = "gameId"
                JOIN categories ON categories.id = games."categoryId" WHERE "customerId" = $1 AND "gameId" = $2;
            `, [customerId, gameId])
            return res.send(rent.rows)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

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