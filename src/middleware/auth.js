//npm i bcrypt jsonwebtoken

// Import do decodificador 
import jwt from "jsonwebtoken"

//Export do auth para fazer a verificação do sistema de login
export default async function authMiddleware(req, res, next) {

    try {

        //verificar se o jwt é valido 
        const token = req.headers["authorization"]

        //verificação se a um token autorizado
        if (!token) {
            throw new Error()
        }
        //Decodificador de palavra passe 
        const decoded = jwt.verify(token)
        req.session = decoded
        next()

        //mensagem de erro caso nao cumpra as exigencias s
    } catch (error) {
        res.status(403).send({
            message: "Usuário ou senha inválido"
        })
    }
}