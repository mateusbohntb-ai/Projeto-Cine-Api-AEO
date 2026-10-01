import express from 'express'
import ControllerIngresso from "../controller/ingressos.js"
//import authMiddleware from "../middleware/auth.js"

const router = express.Router()

    router.post("/criar", ControllerIngresso.Criar)
    router.get("/buscar", ControllerIngresso.Buscar)
    //router.get("/listar", authMiddleware, ControllerIngresso.Listar)
    router.get("/detalhe/:id", ControllerIngresso.Detalhe)
    router.put("/atualizar/:id", ControllerIngresso.Atualizar)
    router.delete("/deletar/:id", ControllerIngresso.Deletar)

export default router