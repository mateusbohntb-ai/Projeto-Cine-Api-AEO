import express from "express"
import ControllerSessao from "../controller/sessoes.js"
//import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.get("/buscar",ControllerSessao.Buscar)
router.get("/detalhe/:id",ControllerSessao.Detalhe)
//router.get("/detalhe/:id", authMiddleware, ControllerSessao.Detalhe)
router.post("/criar", ControllerSessao.Criar) //http://localhost:3000/api/v1/sessoes/criar
router.put("/alterar/:id", ControllerSessao.Alterar)
router.delete("/deletar/:id", ControllerSessao.Deletar)

export default router