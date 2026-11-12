import express from "express"
import cors from "cors"
import atendente from "./src/router/atendente.js"
import filmes from "./src/router/filmes.js"
import ingressos from "./src/router/ingressos.js"
import sessoes from "./src/router/sessoes.js"
import salas from "./src/router/salas.js"
import database from "./src/config/database.js"
import RepositoryAtendente from "./src/repository/atendente.js"
import ServiceAtendente from "./src/service/atendente.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/atendente", atendente)
app.use("/api/v1/filmes", filmes)
app.use("/api/v1/ingressos", ingressos)
app.use("/api/v1/salas", salas)
app.use("/api/v1/sessoes", sessoes)

async function criarAtendenteFixo() {
  const existe = await RepositoryAtendente.FindByEmail("admin@cineapi.com")

  if (!existe) {
    await ServiceAtendente.Criar("admin@cineapi.com", "admin123", "47999999999", "venda de ingressos")
  }
}

database.db
  .sync({ force: false })
  .then(async () => {
    await criarAtendenteFixo()

    app.listen(3000, () => {
      console.log("servidor rodando porta 3000")
    })
  })
  .catch((e) => {
    console.log(e)
  })

export default app