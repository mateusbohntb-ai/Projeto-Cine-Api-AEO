import express from 'express'
import ControllerIngresso from "../controller/ingressos.js"
//import authMiddleware from "../middleware/auth.js"

const router = express.Router()

    router.post("/criar", ControllerIngresso.Criar)
    router.get("/listar", ControllerIngresso.Listar)
    //router.get("/listar", authMiddleware, ControllerIngresso.Listar)
    router.get("/buscar/:id", ControllerIngresso.Buscar)
    router.put("/atualizar/:id", ControllerIngresso.Atualizar)
    router.delete("/deletar/:id", ControllerIngresso.Deletar)

export default router