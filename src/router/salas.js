import express from "express"
import ControllerSalas from "../controller/salas.js"
const router = express.Router()

router.get("/buscar", ControllerSalas.Buscar)
router.get("/detalhe/:id", ControllerSalas.Detalhe)
router.post("/criar", ControllerSalas.Criar)
router.put("/alterar/:id", ControllerSalas.Alterar)
router.delete("/deletar/:id", ControllerSalas.Deletar)

export default router