import express from "express"
import ControllerSalas from "../controller/salas.js"


const router = express.Router()

router.get("/buscar", ControllerSalas.Buscar)
router.get("/detalhe/:id", ControllerSalas.Detalhe)
router.post("/criar", authMiddleware, ControllerSalas.Criar)
router.put("/alterar/:id", authMiddleware, ControllerSalas.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerSalas.Deletar)

export default router