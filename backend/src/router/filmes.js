import express from "express"
import ControllerFilmes from "../controller/filmes.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.get("/buscar", ControllerFilmes.Buscar)
router.get("/detalhe/:id", ControllerFilmes.Detalhe)
router.post("/criar", authMiddleware, ControllerFilmes.Criar)
router.put("/alterar/:id", authMiddleware, ControllerFilmes.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerFilmes.Deletar)

export default router