import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import categoryRoutes from "./routes/categories.routes.js"
import gamesRoutes from "./routes/games.routes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(json())

app.use(categoryRoutes)
app.use(gamesRoutes)

app.use((req, res) => {
    res.status(404).send("Rota não encontrada!")
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running in port ${port}`))