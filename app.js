import express from "express"
import filmes from "./src/router/filmes.js"
import salas from "./src/router/salas.js"


const app = express()

app.use(express.json())

app.use("/api/v1/filmes", filmes)
app.use("/api/v1/salas", salas)

export default app 