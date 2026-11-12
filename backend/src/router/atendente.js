import express from "express"
import authMiddleware from "../middleware/auth.js"
import ControllerAtendente from "../controller/atendente.js"

const router = express.Router()

router.get("/buscar", authMiddleware, ControllerAtendente.Buscar)
router.get("/detalhe/:id", authMiddleware, ControllerAtendente.Detalhe)
router.post("/login", ControllerAtendente.Login)
router.post("/criar", authMiddleware, ControllerAtendente.Criar)
router.put("/alterar/:id", authMiddleware, ControllerAtendente.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerAtendente.Deletar)

export default router