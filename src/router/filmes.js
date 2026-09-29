import express from "express"
import ControllerFilmes from "../controller/filmes.js"
const router = express.Router()

router.get("/buscar", ControllerFilmes.Buscar)
router.get("/detalhe/:id", ControllerFilmes.Detalhe)
router.post("/criar", ControllerFilmes.Criar)
router.put("/alterar/:id", ControllerFilmes.Alterar)
router.delete("/deletar/:id", ControllerFilmes.Deletar)

export default router