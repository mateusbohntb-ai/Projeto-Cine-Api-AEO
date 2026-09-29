//Import express 
import express from "express"

//Import do Controller atendente 
import ControllerAtndente from "../controller/atendente.js"

//constante router que será implementado as rotas do CRUD
const router = express.Router()

//Buscar todos do banco de dados 
router.get("/Buscar", ControllerAtndente.Buscar)

// Buscar um unico atendente/funcionario do cinema  
router.get("/Detalhes/:id", ControllerAtndente.Detalhe)

//Login do Funcionario 
router.post("/Login", ControllerAtndente.Login)

//Cadastrar um funcionario 
router.post("/Criar", ControllerAtndente.Criar)

//Alterar os dados de um funcionario 
router.put("/Alterar/:id", ControllerAtndente.Alterar)

//Deletar um Funcionario 
router.delete("/Deletar/:id", ControllerAtndente.Deletar)


export default router