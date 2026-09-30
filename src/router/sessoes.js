import express from "express"
import ControllerSessao from "../controller/sessoes.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.get("/buscar", authMiddleware, ControllerSessao.Buscar)
router.get("/detalhe/:id", authMiddleware, ControllerSessao.Detalhe)
router.post("/criar", authMiddleware, ControllerSessao.Criar)
router.put("/alterar/:id", authMiddleware, ControllerSessao.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerSessao.Deletar)

export default router