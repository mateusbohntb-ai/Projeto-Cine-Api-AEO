import express from "express"

import atendente from "./src/router/atendente.js"
import filmes from "./src/router/filmes.js"
import ingressos from "./src/router/ingressos.js"
import sessoes from "./src/router/sessoes.js"
import salas from "./src/router/salas.js"

const app = express()

app.use(express.json())

app.use("/api/v1/atendente", atendente)
app.use("/api/v1/filmes", filmes)
app.use("/api/v1/ingressos", ingressos)
app.use("/api/v1/salas", salas)
app.use("/api/v1/sessoes", sessoes)

export default app