import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(json())


app.use((req, res) => {
    res.status(404).send("Rota não encontrada!")
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running in port ${port}`))