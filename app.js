import express from "express"

import atendente from "./src/router/atendente.js"

const app = express()

app.use(express.json())

//app.use("/api/v1/atendente",atendente)

export default app 