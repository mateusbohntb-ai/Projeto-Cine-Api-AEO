import express from "express"
import authMiddleware from "../middleware/auth.js"
import ControllerAtendente from "../controller/atendente.js"

const router = express.Router()

router.get("/Buscar", authMiddleware, ControllerAtendente.Buscar)
router.get("/Detalhes/:id", authMiddleware, ControllerAtendente.Detalhe)
router.post("/Login", ControllerAtendente.Login)
router.post("/Criar", authMiddleware, ControllerAtendente.Criar)
router.put("/Alterar/:id", authMiddleware, ControllerAtendente.Alterar)
router.delete("/Deletar/:id", authMiddleware, ControllerAtendente.Deletar)

export default router