import connection from "../database/database.js";

export async function getGames(req, res) {
    try {
        const games = await connection.query("SELECT * FROM games;")
        res.send(games.rows)
    } catch (err) {
        res.sendStatus(500)
    }
}