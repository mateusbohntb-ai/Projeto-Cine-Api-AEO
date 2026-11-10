//npm i bcrypt jsonwebtoken

// Import do decodificador 
import jwt from "jsonwebtoken"

//Export do auth para fazer a verificação do sistema de login
export default async function authMiddleware(req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(401).send({ message: "Token não informado" })
        }

        const token = authorization.replace(/^Bearer\s+/i, "")
        const secret = process.env.JWT_SECRET

        if (!secret) {
            return res.status(500).send({ message: "JWT_SECRET não configurado" })
        }

        req.session = jwt.verify(token, secret)
        return next()
    } catch (error) {
        return res.status(403).send({
            message: "Usuário ou senha inválido"
        })
    }
}