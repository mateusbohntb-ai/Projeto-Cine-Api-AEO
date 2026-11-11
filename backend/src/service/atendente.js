import jwt from "jsonwebtoken"
import RepositoryAtendente from "../repository/atendente.js"
import bcrypt from "bcrypt"

const segredo = 'cineapi123'

class ServiceAtendente {

    async Buscar() {
        const dados = await RepositoryAtendente.FindAll()
        return { dados }
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const buscaratendente = await RepositoryAtendente.Find(id)

        if (!buscaratendente) {
            throw new Error(`ID ${id} do usuario não encontrado`)
        }
        return buscaratendente
    }

    async Login(email, senha) {
        if (!email || !senha) {
            throw new Error("Email ou senha inválido")
        }

        const usuario = await RepositoryAtendente.FindByEmail(email)

        if (!usuario) {
            throw new Error("Email ou senha inválido")
        }

        if (
            !(await bcrypt.compare(String(senha), usuario.senha))
        ) {
            throw new Error("Email ou senha inválido")
        }

        return jwt.sign(
            { id: usuario.id, email },
            segredo,
            { expiresIn: 60 * 60 }
        )
    }

    async Criar(email, senha, telefone, setor) {
        if (!email || !senha || !telefone || !setor) {
            throw new Error("Favor informar todos os dados ")
        }

        const senhaCriptografada = await bcrypt.hash(senha, 12)

        const novousuario = await RepositoryAtendente.Create(email, senhaCriptografada, telefone, setor)
        return { novousuario }
    }

    async Alterar(id, email, senha, telefone, setor) {
        if (!id || !email || !senha || !telefone || !setor) {
            throw new Error("Favor informar os dados")
        }

        const senhaCriptografada = await bcrypt.hash(senha, 12)

        const usuarioalterado = await RepositoryAtendente.Update(id, email, senhaCriptografada, telefone, setor)

        return usuarioalterado
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar todos os dados ")
        }

        const Deletarusuario = await RepositoryAtendente.Delete(id)

        return Deletarusuario
    }
}

export default new ServiceAtendente()