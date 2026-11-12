import express from 'express'
import ControllerIngresso from "../controller/ingressos.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.get("/buscar", ControllerIngresso.Buscar)
router.get("/detalhe/:id", ControllerIngresso.Detalhe)
router.post("/criar", authMiddleware, ControllerIngresso.Criar)
router.put("/atualizar/:id", authMiddleware, ControllerIngresso.Atualizar)
router.delete("/deletar/:id", authMiddleware, ControllerIngresso.Deletar)

export default router